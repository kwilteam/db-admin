export enum Tables {
  AccountType = "account_type",
  Account = "account",
  AccessCode = "access_code",
  Settings = "settings",
  RefreshToken = "refresh_token",
}

export interface IAccountType {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface IAccount {
  id: number
  type_id: number
  address: string
  name: string
  created_at?: string
  updated_at?: string
}

export interface IAccountWithType extends IAccount {
  type_name: string
}

export interface ISettings {
  key: string
  value: string
  created_at: string
  updated_at: string
}

export interface IAccessCode {
  account_id: number
  code: string
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

CREATE TABLE IF NOT EXISTS ${Tables.Settings} (
  key TEXT PRIMARY KEY,
  value TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ${Tables.AccessCode} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER,
  code TEXT UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  expires_at TEXT,
  FOREIGN KEY(account_id) REFERENCES ${Tables.Account}(id)
);

CREATE TABLE IF NOT EXISTS ${Tables.RefreshToken} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id INTEGER,
  token TEXT UNIQUE,
  expires_at TEXT,
  FOREIGN KEY(account_id) REFERENCES ${Tables.Account}(id)
);
`
