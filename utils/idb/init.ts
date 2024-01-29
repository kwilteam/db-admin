import { openDB, IDBPDatabase } from "idb"
import { setupSettings } from "./settings"
import { setupSchema } from "./ide"
import { setupProviders } from "./providers"

export enum StoreNames {
  SCHEMA = "schema",
  PROVIDER = "provider",
  SETTINGS = "settings",
}

export enum SettingsKeys {
  PROVIDER = "provider",
  ACCOUNT = "account",
}

const createStore = (db: IDBPDatabase<unknown>, storeName: StoreNames) => {
  db.createObjectStore(storeName, { keyPath: "name" })
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
        createStore(db, StoreNames.PROVIDER)

        // Create the settings store
        createStore(db, StoreNames.SETTINGS)
      },
    })

    // Inserting default schema after the upgrade has finished
    // Only if the database has just been created
    if (!dbExists) {
      await setupSchema(db)
      await setupProviders(db)
      await setupSettings(db)
    }

    return db
  } catch (error) {
    console.error("Error initializing database:", error)
  }

  return undefined
}
