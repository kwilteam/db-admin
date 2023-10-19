"use client"

import { useEffect, useState } from "react"
import { getAccount } from "@/utils/api"
import Header from "@/components/Settings/Accounts/Header"
import Button from "@/components/Button"
import Link from "next/link"
import { AccountPlusIcon, CloseIcon } from "@/utils/icons"
import ActionPanel from "@/components/Settings/Accounts/ActionPanel"
import Form from "@/components/Settings/Accounts/Form"
import { IAccount } from "@/utils/admin-db/schema"
import Loading from "@/components/Loading"
import Alert from "@/components/Alert"

interface IAccountPageProps {
  params: {
    id: number
  }
}

export default function AccountPage({ params }: IAccountPageProps) {
  const { id } = params
  const [account, setAccount] = useState<IAccount>({
    id: 0,
    name: "",
    type_id: 0,
    address: "",
  })
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

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
        setError(true)
      }

      setLoading(false)
    }

    initAccount()
  }, [id])

  const saveAccount = () => {
    console.log("save account", account)
  }

  return (
    <>
      <Header accountName={account?.name ?? "New Account"} />

      <div className="flex-1 overflow-scroll bg-slate-50">
        {error && (
          <Alert
            type="error"
            text="There was an error loading the account."
            className="m-2"
          />
        )}
        {!loading && <Form account={account} setAccount={setAccount} />}
        {loading && <Loading className="m-2 flex justify-center" />}
      </div>

      <ActionPanel>
        <Button context="secondary">
          <Link href="/settings/accounts" className="flex">
            <CloseIcon className="mr-1 h-4 w-4" />
            Cancel
          </Link>
        </Button>
        <Button context="primary" onClick={() => saveAccount()}>
          <AccountPlusIcon className="mr-1 h-4 w-4" />
          Save
        </Button>
      </ActionPanel>
    </>
  )
}
