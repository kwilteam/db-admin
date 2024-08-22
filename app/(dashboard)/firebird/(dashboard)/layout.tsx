"use client"

import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { getAccount, signOut } from "@/utils/firebird"

export default function FirebirdDashboardLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
  const router = useRouter()

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

  const signOutRedirect = async () => {
    const { status } = await signOut()
    if (status === 200) {
      router.push("/firebird/login")
    }
  }

  if (loggedIn === true) {
    return (
      <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
        {children}
        {/* <button
          className="text-sm font-bold text-kwil"
          onClick={() => signOutRedirect()}
        >
          Sign out
        </button> */}
      </div>
    )
  }
}
