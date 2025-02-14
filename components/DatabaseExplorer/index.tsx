"use client"

import { selectActiveAccount, selectProviderStatus } from "@/store/global"
import { useAppSelector } from "@/store/hooks"
import useDatabases from "@/hooks/database/use-databases"
import { KwilProviderStatus } from "@/store/providers"
import DatabaseFilterSearch from "./DatabaseFilterSearch"
import Loading from "../Loading"
import DatabaseList from "./DatabaseList"
import Button from "../Button"
import Link from "next/link"

export default function DatabasesExplorer({ isMobile = false }) {
  const activeAccount = useAppSelector(selectActiveAccount)
  const providerStatus = useAppSelector(selectProviderStatus)
  const {
    fetchNamespacesLoading,
    namespacesLoading,
    loadedNamespaces,
    pinnedNamespaces,
    count,
    isDbOwner
  } = useDatabases()

  return (
    <div
      data-testid="database-explorer"
      className="relative w-full bg-white lg:max-h-screen lg:min-h-screen lg:overflow-scroll"
    >
      <ul className="flex flex-col">
        {providerStatus === KwilProviderStatus.Offline && (
          <div className="mt-2 flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm text-red-500">Kwil Node is offline</p>
            <Button 
              context="primary"
              size="md"
              className="mt-2"
            >
              <Link href="/firebird" className="flex">
                Deploy Node
                </Link>
            </Button>
          </div>
        )}

        {providerStatus === KwilProviderStatus.Online && (
          <DatabaseFilterSearch isMobile={isMobile} />
        )}

        {providerStatus === KwilProviderStatus.Online &&
          fetchNamespacesLoading && (
            <Loading className="absolute right-2 top-12 mt-1 flex justify-center" />
          )}

        {providerStatus === KwilProviderStatus.Online &&
          count !== undefined && (
            <>
              <DatabaseList
                databases={pinnedNamespaces}
                loading={false}
                isMobile={isMobile}
                isDbOwner={isDbOwner}
                isPinned
              />
              <DatabaseList
                databases={loadedNamespaces}
                loading={namespacesLoading}
                isMobile={isMobile}
                isDbOwner={isDbOwner}
                activeAccount={activeAccount}
              />
            </>
          )}
      </ul>
    </div>
  )
}
