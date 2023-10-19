import os from "os"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import { HDNodeWallet } from "ethers"

dotenv.config()

const userDirectory = os.homedir()
export const kwilAdminUiDirectory = path.join(userDirectory, ".kwil-admin-ui")
const privateKeyFile = path.join(kwilAdminUiDirectory, "private.key")

// Used when setting up the UI for the first time
export const createAdminPk = (mnemonic?: string) => {
  if (!fs.existsSync(kwilAdminUiDirectory)) {
    fs.mkdirSync(kwilAdminUiDirectory, { recursive: true })
  }

  if (!fs.existsSync(privateKeyFile)) {
    const wallet = mnemonic
      ? HDNodeWallet.fromPhrase(mnemonic, `m/44'/60'/0'/0/0`)
      : HDNodeWallet.createRandom()

    fs.writeFileSync(privateKeyFile, wallet.privateKey)
  }
}

export const getAdminPk = (): string => {
  if (fs.existsSync(privateKeyFile)) {
    return fs.readFileSync(privateKeyFile, "utf8")
  }

  throw new Error(`Could not find Key`)
}
