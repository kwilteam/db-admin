"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { getAccount } from "@/utils/firebird/api"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectAccount, setAccount } from "@/store/firebird"
import Loading from "@/components/Loading"

export default function FirebirdDashboardLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const dispatch = useAppDispatch()
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
  const account = useAppSelector(selectAccount)

  useEffect(() => {
    const loadAsync = async () => {
      const { data, status } = await getAccount()

      if (status === 200) {
        dispatch(setAccount(data))
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }

    if (account === undefined) {
      loadAsync()
    } else {
      setLoggedIn(true)
    }
  }, [dispatch, account])

  useEffect(() => {
    if (loggedIn === false) {
      redirect("/firebird/login")
    }
  }, [loggedIn])

  if (loggedIn === true) {
    return (
      <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
        {children}
      </div>
    )
  } else {
    return <Loading className="mt-4 flex justify-center" />
  }
}
