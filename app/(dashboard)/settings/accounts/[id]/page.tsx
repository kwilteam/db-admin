"use client"

import Header from "@/components/Settings/Accounts/Header"
import Button from "@/components/Button"
import Link from "next/link"
import { AccountPlusIcon, CloseIcon } from "@/utils/icons"
import ActionPanel from "@/components/Settings/Accounts/ActionPanel"
import Form from "@/components/Settings/Accounts/Form"
import Loading from "@/components/Loading"
import Alert from "@/components/Alert"
import useSaveAccount from "@/hooks/useSaveAccount"

interface IAccountPageProps {
  params: {
    id: number
  }
}

export default function AccountPage({ params }: IAccountPageProps) {
  const { id } = params
  const { account, setAccount, error, loading, invalidFields, saveAccount } =
    useSaveAccount(id)

  return (
    <>
      <Header
        accountName={
          !account || !account.name.length ? "New Account" : account.name
        }
      />

      <div className="flex-1 overflow-scroll bg-slate-50">
        {error && <Alert type="error" text={error} className="m-2" />}
        {!loading && (
          <Form
            account={account}
            setAccount={setAccount}
            invalidFields={invalidFields}
          />
        )}
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
