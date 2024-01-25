import { BrowserProvider, ethers } from "ethers"
import { WebKwil, Utils, KwilSigner } from "@kwilteam/kwil-js" // or NodeKwil
import { EthSigner } from "@kwilteam/kwil-js/dist/core/builders"

declare global {
  interface Window {
    ethereum: any
  }
}

export const getProvider = async () => {
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum)
  }
  return new ethers.JsonRpcProvider()
}

export const getSigner = async () => {
  const provider = await getProvider()
  return provider.getSigner()
}

export const getAddress = async () => {
  const signer = await getSigner()
  return await signer.getAddress()
}

export const signMessage = async (message: string) => {
  const signer = await getSigner()
  const signedMessage = await signer.signMessage(message)
  return signedMessage
}

export const buildMessage = (accessCode: string, expiryDate: string) => {
  return `Ethereum Signed Message:\nSign into Kwil Admin\n\nAccess Code: ${accessCode}\nExpiry Date: ${expiryDate}`
}

export const getKwilProvider = async (): Promise<{
  readOnlyKwilProvider: WebKwil
  writeKwilProvider: WebKwil
}> => {
  const readOnlyKwilProvider = new WebKwil({
    // kwilProvider: "https://testnet.kwil.com",
    // chainId: "kwil-chain-testnet-0.6",
    kwilProvider: "http://localhost:8080",
    chainId: "",
    logging: true, // enable logging, default false
  })

  const { data } = await readOnlyKwilProvider.chainInfo()
  console.log("chainInfo", data)
  const chainId = data?.chain_id

  if (!chainId) throw new Error("Failed to fetch chain ID")

  const writeKwilProvider = new WebKwil({
    kwilProvider: "http://localhost:8080",
    chainId,
    logging: true, // enable logging, default false
  })

  return { readOnlyKwilProvider, writeKwilProvider }
}

export const getKwilSigner = async (): Promise<KwilSigner> => {
  const signer = await getSigner()

  // get ethereum address
  const identifier = await getAddress()

  // create kwil signer
  return new KwilSigner(signer, identifier)
}

export const getKwilTx = async (kwilProvider: WebKwil, txHash: string) => {
  const tx = await kwilProvider.txInfo(txHash)
  console.log("TX", tx)
  return tx
}
