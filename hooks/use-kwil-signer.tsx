import { useEffect, useState } from "react"
import { KwilSigner } from "@kwilteam/kwil-js" // or NodeKwil
import { getAddress, getSigner } from "../utils/wallet"
import { useAppSelector } from "@/store/hooks"
import { selectActiveAccount } from "@/store/global"

export const useKwilSigner = (): KwilSigner | undefined => {
  const activeAccount = useAppSelector(selectActiveAccount)
  const [kwilSigner, setKwilSigner] = useState<KwilSigner | undefined>(
    undefined,
  )

  useEffect(() => {
    if (!activeAccount) {
      setKwilSigner(undefined)
      return
    }

    const initKwilSigner = async () => {
      try {
        const signer = await getSigner()
        const identifier = await getAddress()
        const _kwilSigner = new KwilSigner(signer, identifier)
        setKwilSigner(_kwilSigner)
      } catch (error) {
        console.error("Failed to initialize KwilSigner:", error)
      }
    }

    initKwilSigner()
  }, [activeAccount])

  return kwilSigner
}
