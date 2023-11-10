import os from "os"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import { HDNodeWallet } from "ethers"
import { initDb } from "./db"

dotenv.config()

const userDirectory = os.homedir()
let kwilAdminUiDirectory: string

if (process.env.APP_ENV === "test") {
  kwilAdminUiDirectory = path.join(process.cwd(), "/tests/.kwil-admin-ui")
} else {
  kwilAdminUiDirectory = path.join(userDirectory, ".kwil-admin-ui")
}

export const privateKeyFile = path.join(kwilAdminUiDirectory, "private.key")
const dbLocation = path.join(kwilAdminUiDirectory, "data")
export const dbFileLocation = path.join(dbLocation, "admin.sqlite")

export const createDb = (): boolean => {
  if (!fs.existsSync(kwilAdminUiDirectory)) {
    fs.mkdirSync(kwilAdminUiDirectory, { recursive: true })
  }

  if (!fs.existsSync(dbLocation)) {
    fs.mkdirSync(dbLocation, { recursive: true })
  }

  initDb()

  return true
}

export const isDbSetup = (): boolean => {
  return fs.existsSync(dbFileLocation)
}

export const createMnemonic = (): string | undefined => {
  const wallet = HDNodeWallet.createRandom()
  return wallet.mnemonic?.phrase
}

// Used when setting up the UI for the first time
export const createAdminPk = (mnemonic: string): boolean => {
  if (!fs.existsSync(kwilAdminUiDirectory)) {
    fs.mkdirSync(kwilAdminUiDirectory, { recursive: true })
  }

  if (!fs.existsSync(privateKeyFile)) {
    try {
      const wallet = mnemonic
        ? HDNodeWallet.fromPhrase(mnemonic, `m/44'/60'/0'/0/0`)
        : HDNodeWallet.createRandom()

      fs.writeFileSync(privateKeyFile, wallet.privateKey)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  return false
}

export const isAdminPkSetup = (): boolean => {
  return fs.existsSync(privateKeyFile)
}
