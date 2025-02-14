import { IDBPDatabase } from "idb"
import { StoreNames } from "./init"

export interface IProvider {
  name: string
  url: string
  chainId?: string
}

export const getProviders = async (
  idb: IDBPDatabase<unknown>,
): Promise<IProvider[]> => {
  return idb.getAll(StoreNames.PROVIDERS)
}

export const getProvider = async (
  idb: IDBPDatabase<unknown>,
  key: string,
): Promise<IProvider> => {
  return await idb.get(StoreNames.PROVIDERS, key)
}

export const setProvider = async (
  idb: IDBPDatabase<unknown>,
  provider: IProvider,
): Promise<void> => {
  try {
    let { name, url, chainId } = provider

    // Strip / if it's at the end of the URL
    if (url.endsWith("/")) {
      url = url.slice(0, -1)
    }

    await idb.put(StoreNames.PROVIDERS, {
      name,
      url,
      chainId,
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
    await idb.delete(StoreNames.PROVIDERS, name)
  } catch (error) {
    throw error
  }
}

export const setupProviders = async (idb: IDBPDatabase<unknown>) => {
  // const testnetProvider: IProvider = {
  //   name: "Testnet",
  //   url: "https://longhorn.kwil.com",
  //   chainId: "longhorn-2",
  // }
  // await setProvider(idb, testnetProvider)

  const localhostProvider: IProvider = {
    name: "Localhost",
    url: "http://localhost:8484",
    chainId: undefined,
  }
  await setProvider(idb, localhostProvider)
}
