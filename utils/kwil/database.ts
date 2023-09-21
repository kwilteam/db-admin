import { KwilTypes } from "@/utils/database-types"
import { getDatabaseId, getKwilInstance, getSigner } from "./core"

export const getDatabases = async (): Promise<
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

export const getDatabaseStructure = async (
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
