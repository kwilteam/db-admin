import { Wallet } from "ethers"
import { KwilTypes, TxReceipt } from "./database-types"
import { NodeKwil, Utils } from "kwil"

export const getKwilDatabases = async (): Promise<
  KwilTypes.GenericResponse<string[]> | undefined
> => {
  try {
    const kwil = getKwilInstance()
    const signer = getSigner()
    const providerAddress = await signer.getAddress()
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

export const executeAction = async (
  database: string,
  action: string,
  inputs: Record<string, string>,
): Promise<KwilTypes.GenericResponse<TxReceipt> | undefined> => {
  try {
    const kwil = getKwilInstance()
    const dbId = await getDatabaseId(database)

    const actionInputs = new Utils.ActionInput()

    for (const [key, value] of Object.entries(inputs)) {
      actionInputs.put(key, value as string)
    }

    const signer = getSigner()

    const tx = await kwil
      .actionBuilder()
      .dbid(dbId)
      .name(action)
      .concat(actionInputs)
      .signer(signer)
      .buildTx()

    const result = (await kwil.broadcast(
      tx,
    )) as KwilTypes.GenericResponse<TxReceipt>

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

  const signer = getSigner()
  const providerAddress = await signer.getAddress()

  // Get the DBID using the database name and the provider address
  const dbId = kwil.getDBID(providerAddress, database)

  if (!dbId) throw new Error("Failed to fetch database ID")

  return dbId
}

const buildQuery = (table: string): string => {
  // Will receive the pagination, sortyBy, filterBy, etc. from the frontend
  return `SELECT * FROM ${table}`
}

const getSigner = (): Wallet => {
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
