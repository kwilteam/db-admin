"use client"

import Link from "next/link"
import Alert from "@/components/Alert"
import Table from "@/components/Settings/Providers/Table"
import Header from "@/components/Settings/Providers/Header"
import ActionPanel from "@/components/Settings/Providers/ActionPanel"
import Button from "@/components/Button"
import { PlusIcon } from "@/utils/icons"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  deleteProviderFromStores,
  selectActiveProvider,
  selectProviders,
} from "@/store/providers"
import { setAlert } from "@/store/global"

export default function ProvidersPage() {
  const dispatch = useAppDispatch()
  const providers = useAppSelector(selectProviders)
  const activeProvider = useAppSelector(selectActiveProvider)

  const confirmDeleteProvider = async (name: string) => {
    if (name === activeProvider) {
      dispatch(
        setAlert({
          type: "error",
          text: "You cannot delete the active provider.",
          position: "top",
        }),
      )
      return
    }

    const confirmed = confirm("Are you sure you want to delete this provider?")

    if (!confirmed) return

    try {
      await dispatch(deleteProviderFromStores(name))

      dispatch(
        setAlert({
          type: "success",
          text: "Provider has been successfully deleted.",
          position: "top",
        }),
      )
    } catch (error) {
      console.error("An error occurred while deleting the provider:", error)
      dispatch(
        setAlert({
          type: "error",
          text: "There was an error deleting the account.",
          position: "top",
        }),
      )
    }
  }

  return (
    <>
      <Header />

      <div className="flex-1 overflow-scroll bg-slate-50">
        {providers && providers.length !== 0 && (
          <Table
            providers={providers}
            confirmDeleteProvider={confirmDeleteProvider}
          />
        )}
        {providers && providers.length === 0 && (
          <Alert
            type="warning"
            className="m-2"
            text="No provider were found."
          />
        )}
        {/* {loading && <Loading className="m-2 flex justify-center" />} */}
      </div>

      <ActionPanel>
        <Button context="primary">
          <Link
            href="/settings/providers/create"
            className="flex"
            test-id="new-provider-btn"
          >
            <PlusIcon className="mr-1 h-4 w-4" />
            Add Provider
          </Link>
        </Button>
      </ActionPanel>
    </>
  )
}
