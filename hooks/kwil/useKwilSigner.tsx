import { useEffect, useState } from "react"
import { KwilSigner } from "@kwilteam/kwil-js" // or NodeKwil
import { getAddress, getSigner } from "../../utils/wallet"

export const useKwilSigner = (): KwilSigner | undefined => {
  const [kwilSigner, setKwilSigner] = useState<KwilSigner>()

  useEffect(() => {
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
  }, [])

  return kwilSigner
}
