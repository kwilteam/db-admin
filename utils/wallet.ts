import { BrowserProvider, Eip1193Provider } from "ethers"

export const getProvider = async (p: Eip1193Provider) => {
  return new BrowserProvider(p)
}

export const getSigner = async (p: Eip1193Provider) => {
  const provider = await getProvider(p)
  return provider.getSigner()
}

export const getAddress = async (p: Eip1193Provider) => {
  const signer = await getSigner(p)
  return await signer.getAddress()
}
