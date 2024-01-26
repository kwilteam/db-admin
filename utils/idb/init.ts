import { openDB, IDBPDatabase } from "idb"
import helloWorldSchema from "@/schemas/hello_world"

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

const setupSchema = async (db: IDBPDatabase<unknown>) => {
  await db.put(StoreNames.SCHEMA, {
    name: "hello_world",
    content: helloWorldSchema,
  })
}

const setupProviders = async (db: IDBPDatabase<unknown>) => {
  await db.put(StoreNames.PROVIDER, {
    name: "Testnet",
    url: "https://testnet.kwil.com",
  })

  await db.put(StoreNames.PROVIDER, {
    name: "Localhost",
    url: "http://localhost:8080",
  })
}

const setupSettings = async (db: IDBPDatabase<unknown>) => {
  await db.put(StoreNames.SETTINGS, {
    name: SettingsKeys.PROVIDER,
    value: "Testnet",
  })

  await db.put(StoreNames.SETTINGS, {
    name: SettingsKeys.ACCOUNT,
    value: undefined,
  })
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
