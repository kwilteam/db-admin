import { IDBPDatabase } from "idb"
import { StoreNames } from "./init"

export const getProviders = async (idb: IDBPDatabase<unknown>) => {
  return idb.getAllKeys(StoreNames.PROVIDER)
}

export const getProvider = async (idb: IDBPDatabase<unknown>, key: string) => {
  return await idb.get(StoreNames.PROVIDER, key)
}

export const setProvider = async (
  idb: IDBPDatabase<unknown>,
  name: string,
  url: string,
): Promise<void> => {
  try {
    await idb.put(StoreNames.PROVIDER, {
      name,
      url,
    })
  } catch (error) {
    console.error("Error while setting provider", error)
    throw error
  }
}

export const deleteProvider = async (
  idb: IDBPDatabase<unknown>,
  name: string,
): Promise<void> => {
  try {
    await idb.delete(StoreNames.PROVIDER, name)
  } catch (error) {
    throw error
  }
}

export const setupProviders = async (idb: IDBPDatabase<unknown>) => {
  await idb.put(StoreNames.PROVIDER, {
    name: "Testnet",
    url: "https://testnet.kwil.com",
  })

  await idb.put(StoreNames.PROVIDER, {
    name: "Localhost",
    url: "http://localhost:8080",
  })
}
