import { BrowserProvider, JsonRpcProvider } from "ethers"

declare global {
  interface Window {
    ethereum: any
  }
}

export const getProvider = async () => {
  if (window.ethereum) {
    return new BrowserProvider(window.ethereum)
  }
  return new JsonRpcProvider()
}

export const getSigner = async () => {
  const provider = await getProvider()
  return provider.getSigner()
}

export const getAddress = async () => {
  const signer = await getSigner()
  return await signer.getAddress()
}
