"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createAdminPk, generateMnemonic } from "@/utils/api"

export default function useCreateMnemonic() {
  const router = useRouter()
  const [loadingMnemonic, setLoadingMnemonic] = useState(true)
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [mnemonic, setMnemonic] = useState<string | null>()
  const [mnemonicSaved, setMnemonicSaved] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const generateMnemonicAsync = async () => {
      setLoadingMnemonic(true)

      try {
        const result = await generateMnemonic()

        if (result.outcome === "success" && result.data) {
          setMnemonic(result.data)
          setLoadingMnemonic(false)
          return
        }

        alert("Error generating mnemonic")
      } catch (error) {
        console.log(error)
        setLoadingMnemonic(false)
      }
    }

    generateMnemonicAsync()
  }, [])

  const createProviderPk = async () => {
    if (!mnemonic) return

    setLoadingCreate(true)

    try {
      const result = await createAdminPk(mnemonic)

      if (result.outcome === "success") {
        setSuccess(true)

        setTimeout(() => {
          router.push("/databases")
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }

    setLoadingCreate(false)
  }

  return {
    mnemonic,
    mnemonicSaved,
    setMnemonicSaved,
    loadingMnemonic,
    loadingCreate,
    success,
    createProviderPk,
  }
}
