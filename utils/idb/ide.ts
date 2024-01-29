import { IDBPDatabase } from "idb"
import { StoreNames } from "./init"
import helloWorldSchema from "@/schemas/hello_world"

export interface ISchema {
  name: string
  content: string
}

export const getSchemas = async (
  idb: IDBPDatabase<unknown>,
): Promise<string[]> => {
  return (await idb.getAllKeys(StoreNames.SCHEMA)).map((key) => key.toString())
}

export const getSchema = async (
  idb: IDBPDatabase<unknown>,
  key: string,
): Promise<ISchema | undefined> => {
  return await idb.get(StoreNames.SCHEMA, key)
}

export const setSchema = async (
  idb: IDBPDatabase<unknown>,
  name: string,
  content: string,
): Promise<void> => {
  try {
    await idb.put(StoreNames.SCHEMA, {
      name,
      content,
    })
  } catch (error) {
    console.error("Error while setting schema", error)
    throw error
  }
}

export const deleteSchema = async (
  idb: IDBPDatabase<unknown>,
  key: string,
): Promise<void> => {
  try {
    await idb.delete(StoreNames.SCHEMA, key)
  } catch (error) {
    throw error
  }
}

export const setupSchema = async (db: IDBPDatabase<unknown>) => {
  await db.put(StoreNames.SCHEMA, {
    name: "hello_world",
    content: helloWorldSchema,
  })
}
