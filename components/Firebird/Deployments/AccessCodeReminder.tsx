"use client"

import { getAccount } from "@/utils/firebird/api"
import {
  IFirebirdApiAccountResponse,
  IFirebirdApiResponse,
} from "@/utils/firebird/types"
import { isLessThan24HoursAgo } from "@/utils/helpers"
import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa6"

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
  const isNewUser = isLessThan24HoursAgo(
    accountData.data?.created_at,
  ) as boolean

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getAccount()
        setAccountData(data)
      } catch (err) {
        setError((err as Error).message || "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchAccount()
  }, [])

  if (loading) {
    return (
      <div>
        <FaSpinner />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (isNewUser) {
    return (
      <div
        className="py-.75 relative border border-kwil bg-kwil px-3 text-white"
        role="alert"
      >
        <span className="text-white-400 block whitespace-nowrap text-xs sm:inline">
          Check your email for an access code from the Kwil team to deploy a
          Kwil Network.
        </span>
      </div>
    )
  }

  return null
}
