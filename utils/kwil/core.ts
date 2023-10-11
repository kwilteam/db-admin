import { Wallet } from "ethers"
import { NodeKwil, Utils } from "@kwilteam/kwil-js"
import { ITxResponse } from "../api"
import { Transaction } from "@kwilteam/kwil-js/dist/core/tx"

export const getKwilInstance = (): NodeKwil => {
  const kwilProviderUrl = getEnvVar("KWIL_PROVIDER_URL")

  return new NodeKwil({
    kwilProvider: kwilProviderUrl,
  })
}

export const getDatabaseId = async (database: string): Promise<string> => {
  const kwil = getKwilInstance()

  const publicKey = await getPublicKey()

  // Get the DBID using the database name and the provider address
  const dbId = kwil.getDBID(publicKey, database)

  if (!dbId) throw new Error("Failed to fetch database ID")

  return dbId
}

export const getSigner = (): Wallet => {
  const env = getEnvVar("ENV")
  let adminPrivateKey = undefined

  if (env === "development") {
    adminPrivateKey = getEnvVar("DEV_KWIL_ADMIN_PK")
  } else if (env === "production") {
    // TODO Private key must be generated using the Mnemonic which is stored securely on the server
    adminPrivateKey = "FROM MNEMONIC"
  } else {
    throw new Error(`Invalid environment: ${env}`)
  }

  return new Wallet(adminPrivateKey)
}

export const getPublicKey = async (): Promise<string> => {
  const signer = getSigner()

  const publicKey = await Utils.recoverSecp256k1PubKey(signer)

  return publicKey
}

const getTxInfo = async (kwil: NodeKwil, txHash: string) => {
  let outcome: string | undefined = undefined
  let message: string | undefined = undefined

  // Keep querying until we get a success or an error code
  while (outcome === undefined && message === undefined) {
    await new Promise((resolve) => setTimeout(resolve, 500)) // wait for 0.5 seconds before querying again
    let txInfo = await kwil.txInfo(txHash)

    if (txInfo.data?.tx_result?.log === "success") {
      console.log("txInfo", txInfo, "success")
      console.log("txInfo.data?.tx_result?.log", txInfo.data?.tx.body.payload)
      outcome = "success"
      message = txInfo.data?.tx_result?.log ?? "Database deployed successfully"
    } else if (txInfo.data?.tx_result?.code !== 0) {
      console.log("txInfo", txInfo, "error")
      outcome = "error"
      message = txInfo.data?.tx_result?.log ?? "Failed to deploy database"
    }

    // If no outcome is found, continue the loop
    if (outcome === undefined && message === undefined) {
      continue
    }

    // If an outcome & message is found, break the loop
    break
  }

  // If no outcome is found after the loop, throw an error
  if (outcome === undefined) {
    throw new Error("Failed to get transaction info")
  }

  return { outcome, message }
}

export const broadcastTx = async (
  kwil: NodeKwil,
  tx: Transaction,
): Promise<ITxResponse> => {
  // broadcast transaction
  const txResult = await kwil.broadcast(tx)
  let outcome: string | undefined = undefined
  let message: string | undefined = undefined

  console.log("txResult", txResult)

  if (txResult.data?.tx_hash) {
    // delay for 1 seconds before querying for tx info - sometimes there is a transaction error when Tx isn't found
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const txInfo = await getTxInfo(kwil, txResult.data.tx_hash)
    outcome = txInfo.outcome
    message = txInfo.message
  }

  if (outcome === "success" && message) {
    return {
      outcome,
      message,
    }
  }

  throw new Error(message || "Transaction failed")
}

const getEnvVar = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`${key} not set`)
  }
  return value
}
