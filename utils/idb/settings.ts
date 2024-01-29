import { IDBPDatabase } from "idb"
import { SettingsKeys, StoreNames } from "./init"

export const getSettings = async (idb: IDBPDatabase<unknown>) => {
  const accountSetting = await getSetting(idb, SettingsKeys.ACCOUNT)
  const providerSetting = await getSetting(idb, SettingsKeys.PROVIDER)

  let provider = providerSetting?.value
  let account = accountSetting?.value

  return { account, provider }
}

export const getSetting = async (
  idb: IDBPDatabase<unknown>,
  key: SettingsKeys,
) => {
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
  await setSetting(db, SettingsKeys.PROVIDER, "Testnet")
  await setSetting(db, SettingsKeys.ACCOUNT, undefined)
}
