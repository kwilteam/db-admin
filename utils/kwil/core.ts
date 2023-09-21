import { Wallet } from "ethers"
import { KwilTypes, TxReceipt } from "@/utils/database-types"
import { NodeKwil, Utils } from "kwil"

export const getKwilInstance = (): NodeKwil => {
  const kwilProviderUrl = getEnvVar("KWIL_PROVIDER_URL")

  return new NodeKwil({
    kwilProvider: kwilProviderUrl,
  })
}

export const getDatabaseId = async (database: string): Promise<string> => {
  const kwil = getKwilInstance()

  const signer = getSigner()
  const providerAddress = await signer.getAddress()

  // Get the DBID using the database name and the provider address
  const dbId = kwil.getDBID(providerAddress, database)

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

const getEnvVar = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`${key} not set`)
  }
  return value
}
