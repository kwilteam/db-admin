"use client"

import { useEffect, useState } from "react"
import { saveAccount as saveAccountApi } from "@/utils/api"
import { IAccount } from "@/utils/admin-db/schema"
import { getAccount } from "@/utils/api"

export default function useSaveAccount(id: number) {
  const [account, setAccount] = useState<IAccount>({
    id: 0,
    name: "",
    type_id: 0,
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

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const validateEthAddress = (address: string) => {
    return /^(0x)?[0-9a-fA-F]{40}$/i.test(address)
  }

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

    if (Number(account.type_id) === 2 && !validateEmail(account.address)) {
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
      // TODO: Need to redirect but not working inside hook
      alert("Account saved successfully.")
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
