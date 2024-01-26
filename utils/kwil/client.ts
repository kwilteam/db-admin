import { WebKwil, KwilSigner } from "@kwilteam/kwil-js" // or NodeKwil
import { getAddress, getSigner } from "../wallet"

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

export const getDatabases = async (readOnlyKwilProvider: WebKwil) => {
  const { data } = await readOnlyKwilProvider.listDatabases()

  console.log("databases", data)
  return data
}
