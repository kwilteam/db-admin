"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { saveAccount as saveAccountApi } from "@/utils/api"
import { IAccount } from "@/utils/admin/schema"
import { getAccount } from "@/utils/api"
import { validateEmailAddress, validateEthAddress } from "@/utils/validate"

export default function useSaveAccount(id: number) {
  const router = useRouter()
  const [account, setAccount] = useState<IAccount>({
    id: 0,
    name: "",
    type_id: 1, // default to wallet
    address: "",
  })
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [invalidFields, setInvalidFields] = useState<string[]>([])

  useEffect(() => {
    const initAccount = async () => {
      if (isNaN(Number(id))) {
        setLoading(false)
        return
      }

      try {
        const account = await getAccount(Number(id))
        setAccount(account.data)
      } catch (error) {
        console.error("An error occurred while retrieving account:", error)
        setError("There was an error loading the account.")
      }

      setLoading(false)
    }

    initAccount()
  }, [id])

  const validateForm = () => {
    let newInvalidFields: string[] = []

    if (!account.name) {
      newInvalidFields.push("name")
    }

    if (Number(account.type_id) === 0) {
      newInvalidFields.push("type_id")
    }

    if (!account.address) {
      newInvalidFields.push("address")
    }

    if (Number(account.type_id) === 1 && !validateEthAddress(account.address)) {
      newInvalidFields.push("address")
    }

    if (
      Number(account.type_id) === 2 &&
      !validateEmailAddress(account.address)
    ) {
      newInvalidFields.push("address")
    }

    if (newInvalidFields.length > 0) {
      setInvalidFields(newInvalidFields)
      console.error(
        "Errors in the following fields: ",
        newInvalidFields.join(", "),
      )
      return false
    }

    // Validation passed - so clear invalid fields & save account
    setInvalidFields([])

    return true
  }

  const saveAccount = async () => {
    if (!validateForm()) return

    try {
      await saveAccountApi(account)
      router.push("/settings/accounts")
    } catch (error) {
      const err = error as Error
      setError(err.message)
      console.error("An error occurred while saving account:", error)

      setTimeout(() => {
        setError(undefined)
      }, 3000)
    }
  }

  return {
    account,
    setAccount,
    error,
    loading,
    invalidFields,
    saveAccount,
  }
}
