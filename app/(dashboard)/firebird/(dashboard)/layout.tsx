"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { getAccount } from "@/utils/firebird"

export default function FirebirdDashboardLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (loggedIn === false) {
      redirect("/firebird/login")
    }
  }, [loggedIn])

  useEffect(() => {
    const loadAsync = async () => {
      const { status } = await getAccount()

      if (status === 200) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }

    loadAsync()
  }, [])

  if (loggedIn === true) {
    return children
  }
}
