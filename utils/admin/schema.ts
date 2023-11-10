export enum Tables {
  AccountType = "account_type",
  Account = "account",
  AccessCode = "access_code",
  RefreshToken = "refresh_token",
}

export enum EnumAccountType {
  Wallet = 1,
  Email = 2,
}

export interface IAccountType {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface IAccount {
  id: number
  type_id: EnumAccountType
  address: string
  name: string
  created_at?: string
  updated_at?: string
}

export interface IAccountWithType extends IAccount {
  type_name: string
}

export interface IAccessCode {
  account_id: number
  code: number
  created_at: string
  updated_at: string
  expires_at: string
}

export interface IRefreshToken {
  id: number
  account_id: number
  token: string
  expires_at: string
}

export const adminDbSchema: string = `
CREATE TABLE IF NOT EXISTS ${Tables.AccountType} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ${Tables.Account} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type_id INTEGER,
  address TEXT UNIQUE,
  name TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(type_id) REFERENCES ${Tables.AccountType}(id)
);

CREATE TABLE IF NOT EXISTS ${Tables.AccessCode} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER,
  code INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT,
  FOREIGN KEY(account_id) REFERENCES ${Tables.Account}(id)
);

CREATE TABLE IF NOT EXISTS ${Tables.RefreshToken} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER,
  token TEXT,
  expires_at TEXT,
  FOREIGN KEY(account_id) REFERENCES ${Tables.Account}(id)
);
`
