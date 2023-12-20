import fs from "fs"
import { Wallet } from "ethers"
import { NodeKwil, Utils } from "@kwilteam/kwil-js"
import { ITxResponse } from "../api"
import { Transaction } from "@kwilteam/kwil-js/dist/core/tx"
import { privateKeyFile } from "../admin/setup"

export const getKwilInstance = (): NodeKwil => {
  try {
    const kwilProviderUrl = getEnvVar("KWIL_PROVIDER_URL")
    const chainId = getEnvVar("KWIL_CHAIN_ID")

    return new NodeKwil({
      kwilProvider: kwilProviderUrl,
      chainId,
      logging: true,
    })
  } catch (error) {
    throw new Error("Failed to get kwil instance")
  }
}

export const getDatabaseId = async (database: string): Promise<string> => {
  const kwil = getKwilInstance()

  const publicKey = await getAddress()

  // Get the DBID using the database name and the provider address
  const dbId = kwil.getDBID(publicKey, database)

  if (!dbId) throw new Error("Failed to fetch database ID")

  return dbId
}

export const getSigner = (): Wallet => {
  let adminPrivateKey = getAdminPk()

  if (!adminPrivateKey) {
    throw new Error("Failed to get admin private key")
  }

  return new Wallet(adminPrivateKey)
}

export const getAddress = async (): Promise<string> => {
  const signer = getSigner()

  const address = await signer.getAddress()

  return address
}

const getTxInfo = async (kwil: NodeKwil, txHash: string) => {
  let outcome: string | undefined = undefined
  let message: string | undefined = undefined

  // Keep querying until we get a success or an error code
  while (outcome === undefined && message === undefined) {
    const txInfo = await kwil.txInfo(txHash)
    const log = txInfo.data?.tx_result?.log
    const code = txInfo.data?.tx_result?.code

    if (log === "success") {
      console.log("txInfo", txInfo, "success")
      outcome = "success"
      message = log
    } else if (code !== 0) {
      console.log("txInfo", txInfo, "error")
      outcome = "error"
      message = log ?? "Transaction failed"
    }

    // If no outcome is found, continue the loop
    if (outcome === undefined && message === undefined) {
      await new Promise((resolve) => setTimeout(resolve, 500)) // wait for 0.5 seconds before querying again
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

  if (txResult.data?.tx_hash) {
    // delay for 1500 ms before querying for tx info - sometimes there is a transaction error when Tx isn't found
    await new Promise((resolve) => setTimeout(resolve, 1500))
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

export const getEnvVar = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`${key} not set`)
  }
  return value
}

export const getAdminPk = (): string | undefined => {
  if (fs.existsSync(privateKeyFile)) {
    return fs.readFileSync(privateKeyFile, "utf8")
  }

  return undefined
}
