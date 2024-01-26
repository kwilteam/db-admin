import { IDBPDatabase } from "idb"
import { SettingsKeys, StoreNames } from "./init"

export const getSetting = async (
  idb: IDBPDatabase<unknown>,
  key: SettingsKeys,
) => {
  return await idb.get(StoreNames.SETTINGS, key)
}

export const setSetting = async (
  idb: IDBPDatabase<unknown>,
  key: SettingsKeys,
  value: string,
): Promise<void> => {
  try {
    await idb.put(StoreNames.SETTINGS, value, key)
  } catch (error) {
    console.error("Error while setting schema", error)
    throw error
  }
}
