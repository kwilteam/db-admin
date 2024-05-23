import { openDB, IDBPDatabase } from "idb"
import { setupSettings } from "./settings"
import { setupSchema } from "./ide"
import { setupProviders } from "./providers"
import { setupPinned } from "./pinned"

export enum StoreNames {
  SCHEMA = "schema",
  PROVIDERS = "providers",
  SETTINGS = "settings",
  QUERIES = "queries",
  PINNED = "pinned",
}

export enum SettingsKeys {
  PROVIDER = "provider",
}

const createStore = (
  db: IDBPDatabase<unknown>,
  storeName: StoreNames,
  keyPath: string | string[] = "name",
) => {
  db.createObjectStore(storeName, { keyPath })
}

// This is a helper function to get the list of indexedDB databases
// Firefox <126 does not support the indexedDB.databases() method, so we need to use localStorage
const getIndexedDBDatabase = async (): Promise<IDBDatabaseInfo[]> => {
  if('databases' in indexedDB) {
    return await indexedDB.databases()
  }

  // If the browser does not support the indexedDB.databases() method
  const dbList = localStorage.getItem("indexedDBList")
  if (dbList) {
    return JSON.parse(dbList) as IDBDatabaseInfo[]
  }

  return []
}

// This is a helper function to update the list of indexedDB databases
// Firefox <126 does not support the indexedDB.databases() method, so we need to use localStorage
const updateIndexedDBList = async (dbList: IDBDatabaseInfo[]) => {
  if('databases' in indexedDB) {
    return
  }

  localStorage.setItem("indexedDBList", JSON.stringify(dbList))
};

export const initIdb = async (): Promise<IDBPDatabase<unknown> | undefined> => {
  try {
    let dbExists = true
    // Check if the database already exists
    const dbList = await getIndexedDBDatabase()
    if (!dbList.map((db) => db.name).includes("kwil-db-admin")) {
      dbExists = false
    }

    // Opening the database
    const db = await openDB("kwil-db-admin", 1, {
      upgrade(db) {
        // Creating the schema store
        createStore(db, StoreNames.SCHEMA)

        // Creating the provider store
        createStore(db, StoreNames.PROVIDERS)

        // Create the settings store
        createStore(db, StoreNames.SETTINGS)

        // Create the pinned databases store
        createStore(db, StoreNames.PINNED, "dbid")

        // Create the queries store
        createStore(db, StoreNames.QUERIES, ["dbid", "name"])
      },
    })

    // Inserting default schema and pinned databases after the upgrade has finished
    // Only if the database has just been created
    if (!dbExists) {
      // update the localstorage for browsers that do not support indexedDB.databases()
      updateIndexedDBList([{ name: "kwil-db-admin", version: 1 }])

      // Set up seeded data
      await setupSchema(db)
      await setupPinned(db)
    }

    // Inserting default settings after the upgrade has finished
    // Only if the settings store is empty
    const settings = await db.getAll(StoreNames.SETTINGS)
    if (!settings.length) {
      await setupSettings(db)
    }

    // Inserting default providers after the upgrade has finished
    // Only if the provider store is empty
    const providers = await db.getAll(StoreNames.PROVIDERS)
    if (!providers.length) {
      await setupProviders(db)
    }

    return db
  } catch (error) {
    console.error("Error initializing database:", error)
  }

  return undefined
}
