import { useEffect, useState } from "react"
import { EnumAccountType } from "@/utils/admin/schema"
import { createInitialAccount } from "@/utils/api"
import { getAddress } from "@/utils/wallet"

export default function useWalletAccountSetup() {
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()
  const [name, setName] = useState<string>("")
  const [address, setAddress] = useState<string>("")

  const getAddressFromWallet = async () => {
    try {
      const _address = await getAddress()
      setAddress(_address)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAddressFromWallet()
  }, [])

  const createWalletAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (!name || name.length < 3) {
        setError("Please enter a name with at least 3 characters.")
        setTimeout(() => {
          setError(undefined)
        }, 3000)
        return
      }

      if (!address || address.length < 3) {
        setError("Please connect your wallet to continue.")
        setTimeout(() => {
          setError(undefined)
        }, 3000)
        return
      }

      const response = await createInitialAccount(
        name,
        EnumAccountType.Wallet,
        address,
      )

      if (response.outcome === "error") {
        setError(response.data as string)
        setTimeout(() => {
          setError(undefined)
        }, 3000)
      }

      // Successfully created account
      setSuccess("Account created! Redirecting...")

      // refresh the page to go to the mnemonic page
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err) {
      setError("There was a problem connecting to your wallet.")
      setTimeout(() => {
        setError(undefined)
      }, 3000)
    }
  }

  return {
    address,
    name,
    setName,
    error,
    success,
    getAddressFromWallet,
    createWalletAccount,
  }
}
