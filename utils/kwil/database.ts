import { KwilTypes } from "@/utils/database-types"
import { getDatabaseId, getKwilInstance, getSigner } from "./core"
import { KuneiformObject, NodeParser } from "kuneiform-parser"

interface IKwilServerError {
  code: number
  message: string
  details: string[]
}

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

export const deployDatabase = async (
  dbDefinition: string,
): Promise<
  KwilTypes.GenericResponse<KwilTypes.TxReceipt> | IKwilServerError
> => {
  try {
    const kwil = getKwilInstance()
    const signer = getSigner()

    // 1. Convert string to object using
    const parser = await NodeParser.load()

    const kuneiformSchema = await parser.parse(dbDefinition)

    if (!kuneiformSchema.json)
      throw new Error("Failed to parse database definition")

    const kfObject: KuneiformObject = JSON.parse(kuneiformSchema.json)

    kfObject.owner = await signer.getAddress()

    console.log("Deploying database", kfObject)

    // 2. Deploy database
    const tx = await kwil.dbBuilder().payload(kfObject).signer(signer).buildTx()

    // broadcast transaction
    const result = await kwil.broadcast(tx)

    console.log("Deployed database", result)

    if (result.status !== 200) throw new Error("Failed to deploy database")

    return result
  } catch (error) {
    console.log(error)

    const errorMsg = error as Error
    const jsonError = JSON.parse(errorMsg.message)

    return jsonError as IKwilServerError
  }
}
