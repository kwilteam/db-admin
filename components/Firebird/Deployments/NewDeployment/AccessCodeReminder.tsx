"use client"

import { setAlert } from "@/store/global"
import { useAppDispatch } from "@/store/hooks"
import { getAccount } from "@/utils/firebird/api"
import {
  IFirebirdApiAccountResponse,
  IFirebirdApiResponse,
} from "@/utils/firebird/types"
import { isLessThan24HoursAgo } from "@/utils/helpers"
import { useEffect, useState } from "react"

export const AccessCodeReminder = () => {
  const dispatch = useAppDispatch();
  const [accountData, setAccountData] = useState<IFirebirdApiResponse<IFirebirdApiAccountResponse>>({
    status: 0,
    message: "",
    data: {
      created_at: 0,
      email: "",
      id: "",
      origin: "",
    },
  })
  const isNewUser = isLessThan24HoursAgo(
    accountData.data?.created_at,
  )

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getAccount()
        setAccountData(data)
      } catch (err) {
        dispatch(
          setAlert({
            text: (err as Error).message ? `Error: ${(err as Error).message}` : "Error fetching account data",
            type: "error",
          })
        )
      }
    }

    fetchAccount()
  }, [])

  if (isNewUser) {
    return (
      <div
        className="py-.75 relative border border-kwil bg-kwil px-3 text-white"
        role="alert"
      >
        <span className="text-white-400 block whitespace-nowrap text-xs sm:inline">
          Check your email for an access code to deploy your network.
        </span>
      </div>
    )
  }
}
