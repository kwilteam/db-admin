import { ethers } from "ethers"

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
