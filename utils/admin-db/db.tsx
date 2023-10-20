import fs from "fs"
import path from "path"
import Database from "better-sqlite3"
import { kwilAdminUiDirectory } from "../setup"
import { IAccountType, IAccountWithType, Tables, adminDbSchema } from "./schema"

const dbLocation = path.join(kwilAdminUiDirectory, "data")
const dbFileLocation = path.join(dbLocation, "admin.sqlite")

export const initDb = () => {
  try {
    if (fs.existsSync(dbFileLocation)) return

    const db = getDb()

    if (!db) return

    // Check if tables exist already
    const tableExists = db
      .prepare(
        `SELECT COUNT(*) as count FROM sqlite_master WHERE type='table' AND (name=? OR name=? OR name=? OR name=?)`,
      )
      .get(
        Tables.Account,
        Tables.AccountType,
        Tables.AccessCode,
        Tables.Settings,
      ) as {
      count: number
    }

    if (tableExists["count"] == 4) return

    db.exec(adminDbSchema)

    addAccountType("eth")
    addAccountType("email")

    console.log(
      "Database initialization and statements execution were successful.",
    )

    db.close()
  } catch (error) {
    console.error(
      "An error occurred during database initialization or statements execution:",
      error,
    )
    throw error
  }
}

export const getDb = () => {
  try {
    const db = new Database(dbFileLocation, { verbose: console.log })

    return db
  } catch (error) {
    console.log("An error occurred during database connection:", error)
  }
}

// Method to add initial admin user
export const initAdminUser = (
  name: string,
  typeId: number,
  address: string,
): void => {
  try {
    // Should only run on setup
    if (adminAccountExists()) return

    addAccount(name, typeId, address)
  } catch (error: any) {
    console.error("An error occurred during admin user initialization:", error)
    throw error
  }
}

export const addAccountType = (name: string): number | bigint | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const userTypeStmt = db.prepare(`
      INSERT INTO ${Tables.AccountType} (name) VALUES (?)
    `)

    const result = userTypeStmt.run(name)

    return result.lastInsertRowid
  } catch (error: any) {
    console.error("An error occurred during account type creation:", error)
    throw error
  }
}

export const addAccount = (
  name: string,
  typeId: number,
  address: string,
): number | bigint | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const userStmt = db.prepare(`
      INSERT INTO ${Tables.Account} (name, type_id, address) VALUES (?, ?, ?)
    `)

    const result = userStmt.run(name, typeId, address)

    return result.lastInsertRowid
  } catch (error: any) {
    console.error("An error occurred during account creation:", error)
    throw error
  }
}

export const updateAccount = (
  id: number,
  name: string,
  typeId: number,
  address: string,
): number | bigint | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const userStmt = db.prepare(`
      UPDATE ${Tables.Account} SET name = ?, type_id = ?, address = ? WHERE id = ?
    `)

    userStmt.run(name, typeId, address, id)

    return id
  } catch (error: any) {
    console.error("An error occurred during account update:", error)
    throw error
  }
}

const adminAccountExists = (): boolean | undefined => {
  const db = getDb()

  if (!db) return

  const userExists = db
    .prepare(`SELECT COUNT(*) as count FROM ${Tables.Account}`)
    .get() as {
    count: number
  }

  if (userExists["count"] > 0) return true

  return false
}

export const deleteAccount = (id: number): boolean | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const userStmt = db.prepare(`
      DELETE FROM ${Tables.Account} WHERE id = ?
    `)

    userStmt.run(id)

    return true
  } catch (error: any) {
    console.error("An error occurred during account deletion:", error)
    throw error
  }
}

export const getAccounts = (): IAccountWithType[] | undefined => {
  try {
    const db = getDb()

    if (!db) {
      throw new Error("Database connection failed.")
    }

    const userStmt = db.prepare(`
      SELECT ${Tables.Account}.*, ${Tables.AccountType}.name as type_name
      FROM ${Tables.Account}
      JOIN ${Tables.AccountType} ON ${Tables.Account}.type_id = ${Tables.AccountType}.id
    `)

    return userStmt.all() as IAccountWithType[]
  } catch (error: any) {
    throw error
  }
}

export const getAccount = (id: number): IAccountWithType | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const userStmt = db.prepare(`
      SELECT * FROM ${Tables.Account} WHERE id = ?
    `)

    return userStmt.get(id) as IAccountWithType
  } catch (error: any) {
    console.error("An error occurred during account retrieval:", error)
    throw error
  }
}

export const getAccountTypes = (): IAccountType[] | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const userStmt = db.prepare(`
      SELECT * FROM ${Tables.AccountType}
    `)

    return userStmt.all() as IAccountType[]
  } catch (error: any) {
    console.error("An error occurred during account type retrieval:", error)
    throw error
  }
}

initDb()
initAdminUser("Martin Creedy", 1, "0x00000000000")
