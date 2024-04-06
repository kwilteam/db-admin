"use client"

import Link from "next/link"
import { PlusIcon } from "@/utils/icons"
import { useAppSelector } from "@/store/hooks"
import { selectProviders } from "@/store/providers"
import useDeleteProvider from "@/hooks/settings/use-delete-provider"
import Table from "@/components/Settings/Providers/Table"
import Header from "@/components/Settings/Providers/Header"
import ActionPanel from "@/components/Settings/Providers/ActionPanel"
import Button from "@/components/Button"

export default function ProvidersPage() {
  const providers = useAppSelector(selectProviders)
  const confirmDeleteProvider = useDeleteProvider()

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
      </div>

      <ActionPanel>
        <Button context="primary">
          <Link href="/settings/providers/create" className="flex">
            <PlusIcon className="mr-1 h-4 w-4" />
            Add Provider
          </Link>
        </Button>
      </ActionPanel>
    </>
  )
}
