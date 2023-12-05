"use client"

import { useEffect, useState } from "react"
import { deleteAccount, getAccounts } from "@/utils/api"
import Link from "next/link"
import Alert from "@/components/Alert"
import Loading from "@/components/Loading"
import Table from "@/components/Settings/Accounts/Table"
import Header from "@/components/Settings/Accounts/Header"
import ActionPanel from "@/components/Settings/Accounts/ActionPanel"
import Button from "@/components/Button"
import { PlusIcon } from "@/utils/icons"
import { IAccountWithType } from "@/utils/admin/schema"
import { useAppDispatch } from "@/store/hooks"
import { setAlert } from "@/store/global"

export default function AccountsPage() {
  const dispatch = useAppDispatch()
  const [accounts, setAccounts] = useState<IAccountWithType[]>()
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchAccounts = async () => {
    try {
      const accounts = await getAccounts()
      setAccounts(accounts.data)
    } catch (error) {
      console.error("An error occurred while retrieving accounts:", error)
      setError(true)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const confirmDeleteAccount = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this account?")

    if (!confirmed) return

    try {
      const deleted = await deleteAccount(id)

      if (deleted) {
        // Reload accounts after deletion
        fetchAccounts()
        dispatch(
          setAlert({
            type: "success",
            text: "Account has been successfully deleted.",
            position: "top",
          }),
        )
      }
    } catch (error) {
      console.error("An error occurred while deleting the account:", error)
      dispatch(
        setAlert({
          type: "error",
          text: "There was an error deleting the account.",
          position: "top",
        }),
      )
    }

    setTimeout(() => {
      dispatch(setAlert(undefined))
    }, 3000)
  }

  return (
    <>
      <Header />

      <div className="flex-1 overflow-scroll bg-slate-50">
        {!loading && accounts && accounts.length !== 0 && (
          <Table
            accounts={accounts}
            confirmDeleteAccount={confirmDeleteAccount}
          />
        )}
        {!loading && accounts && accounts.length === 0 && (
          <Alert
            type="warning"
            className="m-2"
            text="No accounts were found."
          />
        )}
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
          <Link
            href="/settings/accounts/create"
            className="flex"
            test-id="new-account-btn"
          >
            <PlusIcon className="mr-1 h-4 w-4" />
            Create Account
          </Link>
        </Button>
      </ActionPanel>
    </>
  )
}
