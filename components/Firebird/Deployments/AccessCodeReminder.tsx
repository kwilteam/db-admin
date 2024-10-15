"use client"

import { getAccount } from "@/utils/firebird/api"
import {
  IFirebirdApiAccountResponse,
  IFirebirdApiResponse,
} from "@/utils/firebird/types"
import { useEffect, useState } from "react"

export const AccessCodeReminder = () => {
  const [accountData, setAccountData] = useState<
    IFirebirdApiResponse<IFirebirdApiAccountResponse>
  >({
    status: 0,
    message: "",
    data: {
      created_at: 0,
      email: "",
      id: "",
      origin: "",
    },
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const isNewUser = true as boolean

  // TODO => create a helper function that takes in accountData.data?.created_at, compares it to the current time 
    // and if the difference is greater than 24 hours, set isNewUser to false

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getAccount()
        setAccountData(data)
        console.log(data)
      } catch (err) {
        setError((err as Error).message || "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchAccount()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (isNewUser) {
    return (
      <div
        className="py-.75 relative border border-kwil-light bg-kwil-light px-3 text-white"
        role="alert"
      >
        <span className="text-white-400 block whitespace-nowrap text-xs sm:inline">
          Check your email for an access code from the Kwil team to deploy a
          Kwil Network. {accountData.data?.created_at}
        </span>
      </div>
    )
  }

  return null
}
