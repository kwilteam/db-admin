import fs from "fs"
import Database from "better-sqlite3"
import { dbFileLocation } from "./setup"
import { IAccountType, IAccountWithType, Tables, adminDbSchema } from "./schema"
import { format } from "date-fns"

export const initDb = (): void => {
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

    addAccountType("wallet")
    addAccountType("email")

    console.log(
      "Database initialization and statements execution were successful.",
    )

    db.close()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "An error occurred during database initialization or statements execution:",
        error,
      )
      throw error
    }
  }
}

export const getDb = () => {
  try {
    const db = new Database(dbFileLocation, { verbose: console.log })

    return db
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(
        "An error occurred during database connection:",
        "dbFileLocation",
        dbFileLocation,
        error,
      )
    }
  }
}

// Method to add initial admin user
export const initAdminUser = (
  name: string,
  typeId: number,
  address: string,
): number | bigint | undefined => {
  try {
    // Should only run on setup
    if (adminAccountExists()) return

    return addAccount(name, typeId, address)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "An error occurred during admin user initialization:",
        error,
      )
      throw error
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during account type creation:", error)
      throw error
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during account creation:", error)
      throw error
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during account update:", error)
      throw error
    }
  }
}

export const adminAccountExists = (): boolean | undefined => {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during account deletion:", error)
      throw error
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error
    }
  }
}

export const getAccount = (id: number): IAccountWithType | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const userStmt = db.prepare(`
      SELECT ${Tables.Account}.*, ${Tables.AccountType}.name as type_name 
      FROM ${Tables.Account} 
      JOIN ${Tables.AccountType} ON ${Tables.Account}.type_id = ${Tables.AccountType}.id
      WHERE ${Tables.Account}.id = ?
    `)

    return userStmt.get(id) as IAccountWithType
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during account retrieval:", error)
      throw error
    }
  }
}

export const getAccountByAddress = (
  typeId: number,
  address: string,
): IAccountWithType | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const userStmt = db.prepare(`
      SELECT ${Tables.Account}.*, ${Tables.AccountType}.name as type_name 
      FROM ${Tables.Account}
      JOIN ${Tables.AccountType} ON ${Tables.Account}.type_id = ${Tables.AccountType}.id AND ${Tables.Account}.type_id = ?
      WHERE address = ?
    `)

    return userStmt.get(typeId, address) as IAccountWithType
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during account retrieval:", error)
      throw error
    }
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during account type retrieval:", error)
      throw error
    }
  }
}

// Delete all access codes for an account (excluding a specific code if provided)
export const deleteAccessCodes = (
  accountId: number,
  excludeCode?: number | bigint,
): void => {
  try {
    const db = getDb()

    if (!db) return

    if (excludeCode) {
      const userStmt = db.prepare(
        `DELETE FROM ${Tables.AccessCode} WHERE account_id = ? AND id != ?`,
      )

      userStmt.run(accountId, excludeCode)
    } else {
      const userStmt = db.prepare(
        `DELETE FROM ${Tables.AccessCode} WHERE account_id = ?`,
      )

      userStmt.run(accountId)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during access code invalidation:", error)
      throw error
    }
  }
}

export const saveAccessCode = (
  accountId: number,
  code: number,
  expiresAt: string,
): boolean | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const userStmt = db.prepare(`
      INSERT INTO ${Tables.AccessCode} (account_id, code, expires_at) VALUES (?, ?, ?)
    `)

    const result = userStmt.run(accountId, code, expiresAt)

    deleteAccessCodes(accountId, result.lastInsertRowid)

    return true
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during access code creation:", error)
      throw error
    }
  }
}

export const validateAccessCode = (
  accountId: number,
  code: number,
): boolean | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss")

    const accessCode = db
      .prepare(
        `SELECT COUNT(*) as count FROM ${Tables.AccessCode} WHERE account_id = ? AND code = ? AND expires_at > ?`,
      )
      .get(accountId, code, currentDate) as {
      count: number
    }

    if (accessCode["count"] >= 1) {
      // Clear all users access codes
      deleteAccessCodes(accountId)
      return true
    }

    return false
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during access code validation:", error)
      throw error
    }
  }
}

export const getAccessCode = (
  accountId: number,
):
  | {
      code: number
      expires_at: string
    }
  | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const accessCode = db
      .prepare(
        `SELECT code, expires_at FROM ${Tables.AccessCode} WHERE account_id = ?`,
      )
      .get(accountId) as {
      code: number
      expires_at: string
    }

    return accessCode
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during access code retrieval:", error)
      throw error
    }
  }
}

export const invalidateRefreshTokens = (
  accountId: number,
  token: string,
): boolean | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const stmt = db.prepare(`
      DELETE FROM ${Tables.RefreshToken} WHERE account_id = ? AND token != ?
    `)

    stmt.run(accountId, token)

    return true
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "An error occurred during refresh token invalidation:",
        error,
      )
      throw error
    }
  }
}

export const saveRefreshToken = (
  accountId: number,
  token: string,
  expiresAt: string,
): boolean | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const stmt = db.prepare(`
      INSERT INTO ${Tables.RefreshToken} (account_id, token, expires_at) VALUES (?, ?, ?)
    `)

    stmt.run(accountId, token, expiresAt)

    invalidateRefreshTokens(accountId, token)

    return true
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during refresh token creation:", error)
      throw error
    }
  }
}

export const validateRefreshToken = (
  accountId: number,
  token: string,
): boolean | undefined => {
  try {
    const db = getDb()

    if (!db) return

    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss")

    const refreshToken = db
      .prepare(
        `
      SELECT COUNT(*) as count FROM ${Tables.RefreshToken} WHERE account_id = ? AND token = ? AND expires_at > ?
    `,
      )
      .get(accountId, token, currentDate) as {
      count: number
    }

    if (refreshToken["count"] === 1) return true

    return false
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred during refresh token validation:", error)
      throw error
    }
  }
}
