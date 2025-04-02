import { useCallback, useEffect, useState } from "react"
import { KwilSigner } from "@kwilteam/kwil-js" // or NodeKwil
import { getAddress, getSigner } from "../utils/wallet"
import { useAppSelector } from "@/store/hooks"
import { selectActiveAccount } from "@/store/global"
import { usePrivyAccounts } from "./use-privy-accounts"
import { useSignMessage } from "@privy-io/react-auth"
import { bytesToString, hexToBytes } from "@kwilteam/kwil-js/dist/utils/serial"

export const useKwilSigner = (): KwilSigner | undefined => {
  const activeAccount = useAppSelector(selectActiveAccount)
  const { wallets } = usePrivyAccounts();
  const { signMessage } = useSignMessage();
  const [kwilSigner, setKwilSigner] = useState<KwilSigner | undefined>(
    undefined,
  )

  const privySigner = useCallback(
    async (m: Uint8Array) => {
      const message = bytesToString(m)
      const s = await signMessage({ message })
      return hexToBytes(s.signature)
    },
    [signMessage]
  )

  useEffect(() => {
    if (!activeAccount) {
      setKwilSigner(undefined)
      return
    }

    const initKwilSigner = async () => {
      try {
        const wallet = wallets.find((w) => w.address.toLowerCase() === activeAccount.toLowerCase())
        if (!wallet) {
          console.error("Wallet not found for the active account")
          return
        }
      
        if(wallet.walletClientType === 'privy') {
          // using privy wallet
          const _kwilSigner = new KwilSigner(privySigner, wallet.address, "secp256k1_ep")
          setKwilSigner(_kwilSigner)
        } else {
          // using injected wallet
          const provider = await wallet.getEthereumProvider()
          const identifier = await getAddress(provider)
          const signer = await getSigner(provider)
          const _kwilSigner = new KwilSigner(signer, identifier)
          setKwilSigner(_kwilSigner)
        }        
      } catch (error) {
        console.error("Failed to initialize KwilSigner:", error)
      }
    }

    initKwilSigner()
  }, [activeAccount, wallets, privySigner])

  return kwilSigner
}
