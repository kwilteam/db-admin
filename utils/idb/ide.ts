import { IDBPDatabase } from "idb"

export const getSchemas = async (idb: IDBPDatabase<unknown>) => {
  return idb.getAllKeys("schema")
}

export const getSchema = async (idb: IDBPDatabase<unknown>, key: string) => {
  return await idb.get("schema", key)
}

export const setSchema = async (
  idb: IDBPDatabase<unknown>,
  name: string,
  content: string,
): Promise<void> => {
  try {
    await idb.put("schema", {
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
    await idb.delete("schema", key)
  } catch (error) {
    throw error
  }
}
