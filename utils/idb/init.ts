import { openDB, IDBPDatabase } from "idb"
import helloWorldSchema from "@/schemas/hello_world"

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
        db.createObjectStore("schema", { keyPath: "name" })
      },
    })

    // Inserting default schema after the upgrade has finished
    // Only if the database has just been created
    if (!dbExists) {
      await db.put("schema", {
        name: "hello_world",
        content: helloWorldSchema,
      })
    }

    return db
  } catch (error) {
    console.error("Error initializing database:", error)
  }

  return undefined
}
