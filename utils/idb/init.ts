import { openDB, IDBPDatabase } from "idb"
import { setupSettings } from "./settings"
import { setupSchema } from "./ide"
import { setupProviders } from "./providers"

export enum StoreNames {
  SCHEMA = "schema",
  PROVIDERS = "providers",
  SETTINGS = "settings",
  QUERIES = "queries",
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

export const initIdb = async (): Promise<IDBPDatabase<unknown> | undefined> => {
  try {
    let dbExists = true
    // Check if the database already exists
    const dbList = await indexedDB.databases()
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

        // Create the queries store
        createStore(db, StoreNames.QUERIES, ["dbid", "name"])
      },
    })

    // Inserting default schema after the upgrade has finished
    // Only if the database has just been created
    if (!dbExists) {
      await setupSchema(db)
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
