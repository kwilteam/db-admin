"use client"

import { useEffect, useState } from "react"
import { getAccounts } from "@/utils/api"
import Alert from "@/components/Alert"
import Loading from "@/components/Loading"
import Table from "@/components/Settings/Accounts/Table"
import Header from "@/components/Settings/Accounts/Header"
import ActionPanel from "@/components/Settings/Accounts/ActionPanel"
import Button from "@/components/Button"
import { PlusIcon } from "@/utils/icons"
import Link from "next/link"
import { IAccountWithType } from "@/utils/admin-db/schema"

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<IAccountWithType[]>()
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const initAccounts = async () => {
      try {
        const accounts = await getAccounts()
        setAccounts(accounts.data)
      } catch (error) {
        console.error("An error occurred while retrieving accounts:", error)
        setError(true)
      }

      setLoading(false)
    }

    initAccounts()
  }, [])

  return (
    <>
      <Header />

      <div className="flex-1 overflow-scroll bg-slate-50">
        {!loading && accounts && <Table accounts={accounts} />}
        {loading && <Loading className="m-2 flex justify-center" />}
        {error && (
          <Alert
            type="error"
            className="m-2"
            text="There was an error loading admin accounts."
          />
        )}
      </div>

      <ActionPanel>
        <Button context="primary">
          <Link href="/settings/accounts/create" className="flex">
            <PlusIcon className="mr-1 h-4 w-4" />
            Create Account
          </Link>
        </Button>
      </ActionPanel>
    </>
  )
}
