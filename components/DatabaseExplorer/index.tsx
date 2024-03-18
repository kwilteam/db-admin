"use client"

import { selectProviderStatus } from "@/store/global"
import { useAppSelector } from "@/store/hooks"
import useDatabases from "@/hooks/database/use-databases"
import { KwilProviderStatus } from "@/store/providers"
import DatabaseFilterSearch from "./DatabaseFilterSearch"
import Loading from "../Loading"
import DatabaseList from "./DatabaseList"

export default function DatabasesExplorer() {
  const providerStatus = useAppSelector(selectProviderStatus)
  const {
    fetchDatabasesLoading,
    myDbs,
    otherDbs,
    myDbsLoading,
    otherDbsLoading,
    count,
  } = useDatabases()

  return (
    <div
      test-id="database-explorer"
      className="relative w-full bg-white lg:max-h-screen lg:min-h-screen lg:overflow-scroll"
    >
      <ul className="flex flex-col">
        {providerStatus === KwilProviderStatus.Offline && (
          <div className="mt-2 flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm text-red-500">Kwil Provider is offline</p>
          </div>
        )}

        {providerStatus === KwilProviderStatus.Online && (
          <DatabaseFilterSearch />
        )}

        {providerStatus === KwilProviderStatus.Online &&
          fetchDatabasesLoading && (
            <Loading className="absolute right-0 top-12 mt-1 flex justify-center" />
          )}

        {providerStatus === KwilProviderStatus.Online &&
          count !== undefined && (
            <>
              <DatabaseList
                databases={myDbs}
                loading={myDbsLoading}
                myDatabase
              />
              <DatabaseList databases={otherDbs} loading={otherDbsLoading} />
            </>
          )}
      </ul>
    </div>
  )
}
