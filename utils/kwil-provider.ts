import { Wallet } from "ethers"
import { KwilTypes } from "./database-types"
import { NodeKwil } from "kwil"

export const getKwilDatabases = async (): Promise<
  KwilTypes.GenericResponse<string[]> | undefined
> => {
  try {
    const kwil = getKwilInstance()
    const providerAddress = await getProviderAddress()
    const result = await kwil.listDatabases(providerAddress)

    return result
  } catch (error) {
    console.error(error)
  }
}

export const getKwilDatabaseStructure = async (
  database: string,
): Promise<
  KwilTypes.GenericResponse<KwilTypes.Database<string>> | undefined
> => {
  try {
    const kwil = getKwilInstance()
    const dbId = await getDatabaseId(database)
    const result = await kwil.getSchema(dbId)

    if (result.status !== 200)
      throw new Error("Failed to fetch database structure")

    return result
  } catch (error) {
    console.error(error)
  }
}

export const getTableData = async (
  database: string,
  table: string,
): Promise<KwilTypes.GenericResponse<Object[]> | undefined> => {
  try {
    const kwil = getKwilInstance()
    const dbId = await getDatabaseId(database)

    const query = buildQuery(table)

    const result = await kwil.selectQuery(dbId, query)

    if (result.status !== 200) throw new Error("Failed to fetch table data")

    return result
  } catch (error) {
    console.error(error)
  }
}

const getKwilInstance = (): NodeKwil => {
  const kwilProviderUrl = getEnvVar("KWIL_PROVIDER_URL")

  return new NodeKwil({
    kwilProvider: kwilProviderUrl,
  })
}

const getDatabaseId = async (database: string): Promise<string> => {
  const kwil = getKwilInstance()

  const providerAddress = await getProviderAddress()

  // Get the DBID using the database name and the provider address
  const dbId = kwil.getDBID(providerAddress, database)

  if (!dbId) throw new Error("Failed to fetch database ID")

  return dbId
}

const buildQuery = (table: string): string => {
  // Will receive the pagination, sortyBy, filterBy, etc. from the frontend
  return `SELECT * FROM ${table}`
}

const getProviderAddress = async (): Promise<string> => {
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

  const signer = new Wallet(adminPrivateKey)
  return await signer.getAddress()
}

const getEnvVar = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`${key} not set`)
  }
  return value
}
