"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { getAccount } from "@/utils/firebird"
import { useAppDispatch } from "@/store/hooks"
import { setAccount } from "@/store/firebird"

export default function FirebirdDashboardLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const dispatch = useAppDispatch()
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (loggedIn === false) {
      redirect("/firebird/login")
    }
  }, [loggedIn])

  useEffect(() => {
    const loadAsync = async () => {
      const { data, status } = await getAccount()

      dispatch(setAccount(data))

      if (status === 200) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }

    loadAsync()
  }, [dispatch])

  if (loggedIn === true) {
    return (
      <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
        {children}
      </div>
    )
  }
}
