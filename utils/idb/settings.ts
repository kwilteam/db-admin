import { IDBPDatabase } from "idb"
import { SettingsKeys, StoreNames } from "./init"

export interface ISetting {
  name: SettingsKeys
  value: string | undefined
}

export const getSetting = async (
  idb: IDBPDatabase<unknown>,
  key: SettingsKeys,
): Promise<ISetting | undefined> => {
  return await idb.get(StoreNames.SETTINGS, key)
}

export const setSetting = async (
  idb: IDBPDatabase<unknown>,
  key: SettingsKeys,
  value: string | undefined,
): Promise<void> => {
  try {
    await idb.put(StoreNames.SETTINGS, {
      name: key,
      value,
    })
  } catch (error) {
    console.error("Error while setting schema", error)
    throw error
  }
}

export const setupSettings = async (db: IDBPDatabase<unknown>) => {
  await setSetting(db, SettingsKeys.PROVIDER, "Localhost")
}
