import { Wallet } from "ethers"
import { KwilTypes } from "./database-types"
import { NodeKwil } from "kwil"
import { GenericResponse } from "kwil/dist/core/resreq"

type IKwilDatabasesResponse = {
  databases: string[]
}

export const fetchKwilDatabases = async (): Promise<
  IKwilDatabasesResponse | undefined
> => {
  const providerAddress = await getProviderAddress()

  return fetchKwil<IKwilDatabasesResponse>(
    `/api/v1/${providerAddress}/databases`,
  )
}

export const getKwilDatabaseStructure = async (
  database: string,
): Promise<KwilTypes.Database<string> | undefined> => {
  const kwil = getKwilInstance()
  const dbId = await getDatabaseId(database)

  try {
    const result = await kwil.getSchema(dbId)

    if (result.status !== 200)
      throw new Error("Failed to fetch database structure")

    return result.data
  } catch (error) {
    console.error(error)
  }
}

export const getTableData = async (
  database: string,
  table: string,
): Promise<Object[] | undefined> => {
  const kwil = getKwilInstance()
  const dbId = await getDatabaseId(database)

  const query = buildQuery(table)

  try {
    const result = await kwil.selectQuery(dbId, query)

    if (result.status !== 200) throw new Error("Failed to fetch table data")

    return result.data
  } catch (error) {
    console.error(error)
  }
}

const getKwilInstance = (): NodeKwil => {
  // Connect to NodeKwil provider using the provider URL
  // Connect to NodeKwil provider using the provider URL
  const kwilProviderUrl = getEnvironmentVariable("DEV_KWIL_PROVIDER_URL")

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

const fetchKwil = async <T>(url: string): Promise<T | undefined> => {
  const kwilProviderUrl = getEnvironmentVariable("DEV_KWIL_PROVIDER_URL")

  try {
    const response = await fetch(`${kwilProviderUrl}${url}`)

    if (!response.ok) throw new Error("Kwil Provider call failed")

    const data = (await response.json()) as T

    console.log("Kwil Provider Response:", data)

    return data
  } catch (error) {
    console.error(error)
  }
}

const getProviderAddress = async (): Promise<string> => {
  const env = getEnvironmentVariable("ENV")
  let adminPrivateKey = undefined

  if (env === "development") {
    adminPrivateKey = getEnvironmentVariable("DEV_KWIL_ADMIN_PK")
  } else if (env === "production") {
    // TODO Private key must be generated using the Mnemonic which is stored securely on the server
    adminPrivateKey = "FROM MNEMONIC"
  } else {
    throw new Error(`Invalid environment: ${env}`)
  }

  const signer = new Wallet(adminPrivateKey)
  return await signer.getAddress()
}

const getEnvironmentVariable = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`${key} not set`)
  }
  return value
}
