import { KwilTypes } from "@/utils/database-types"
import {
  broadcastTx,
  getDatabaseId,
  getKwilInstance,
  getPublicKey,
  getSigner,
} from "./core"
import { KuneiformObject, NodeParser } from "kuneiform-parser"
import { ITxResponse } from "../api"

export const getDatabases = async (): Promise<
  KwilTypes.GenericResponse<string[]> | undefined
> => {
  try {
    const kwil = getKwilInstance()
    const publicKey = await getPublicKey()
    const result = await kwil.listDatabases(publicKey)

    return result
  } catch (error) {
    console.error(error)
  }
}

export const getDatabaseStructure = async (
  database: string,
): Promise<KwilTypes.GenericResponse<KwilTypes.Database> | undefined> => {
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
): Promise<ITxResponse> => {
  try {
    const kwil = getKwilInstance()
    const signer = getSigner()
    const publicKey = await getPublicKey()

    // 1. Convert string to object using
    const parser = await NodeParser.load()

    const kuneiformSchema = await parser.parse(dbDefinition)

    if (!kuneiformSchema.json) {
      // TODO: Instead the error should be thrown in the parser

      throw new Error(
        // @ts-ignore
        kuneiformSchema.error || "Failed to parse database definition",
      )
    }

    const kfObject: KuneiformObject = JSON.parse(kuneiformSchema.json)

    // 2. Deploy database
    const tx = await kwil
      .dbBuilder()
      .payload(kfObject)
      .publicKey(publicKey)
      .signer(signer)
      .buildTx()

    return await broadcastTx(kwil, tx)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const dropDatabase = async (database: string): Promise<ITxResponse> => {
  try {
    const kwil = getKwilInstance()
    const signer = getSigner()
    const publicKey = await getPublicKey()
    const dbId = await getDatabaseId(database)

    const tx = await kwil
      .dropDbBuilder()
      .payload({ dbid: dbId })
      .publicKey(publicKey)
      .signer(signer)
      .buildTx()

    return await broadcastTx(kwil, tx)
  } catch (error) {
    console.error(error)
    throw error
  }
}
