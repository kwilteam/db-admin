"use client"

import { useEffect, useMemo } from "react"
import { selectActiveAccount, selectProviderStatus } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { IDatasetInfoStringOwner } from "@/utils/database-types"
import { selectDatabaseFilters, setDatabases } from "@/store/database"
import useDatabases from "@/hooks/database/useDatabases"
import DatabaseName from "./DatabaseName"
import DatabaseSchema from "./DatabaseSchema"
import DatabaseFilters from "./DatabaseFilters"
import Loading from "../Loading"
import { KwilProviderStatus } from "@/store/providers"

export default function DatabasesExplorer() {
  const dispatch = useAppDispatch()
  const { databases } = useDatabases()
  const providerStatus = useAppSelector(selectProviderStatus)
  const activeAccount = useAppSelector(selectActiveAccount)
  const databaseFilters = useAppSelector(selectDatabaseFilters)
  const count = databases?.length

  const myDatabases = useMemo(() => {
    if (activeAccount === undefined) return []

    return databases
      ?.filter((db) => {
        return (
          `0x${db.owner}` === activeAccount &&
          db.name.includes(databaseFilters.search)
        )
      })
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
  }, [databases, activeAccount, databaseFilters.search])

  const otherDatabases = useMemo(() => {
    if (databaseFilters.showAll === false) return []

    return databases
      ?.filter((db) => {
        return (
          `0x${db.owner}` !== activeAccount &&
          db.name.includes(databaseFilters.search)
        )
      })
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
  }, [databases, activeAccount, databaseFilters])

  // Clear the databases when the component is unmounted
  // This forces the component to reload the databases when it is mounted again
  useEffect(() => {
    return () => {
      dispatch(setDatabases(undefined))
    }
  }, [dispatch])

  return (
    <div
      test-id="database-explorer"
      className="w-full bg-white lg:max-h-screen lg:min-h-screen lg:overflow-scroll"
    >
      <ul className="mt-2 flex flex-col">
        {providerStatus === KwilProviderStatus.Offline && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm text-red-500">Kwil Provider is offline</p>
          </div>
        )}

        {providerStatus === KwilProviderStatus.Online && <DatabaseFilters />}

        {providerStatus === KwilProviderStatus.Online &&
          count === undefined && (
            <Loading className="mt-4 flex justify-center" />
          )}

        {count === 0 && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-sm font-semibold text-slate-500">
              No databases were found
            </p>
          </div>
        )}

        {providerStatus === KwilProviderStatus.Online &&
          count !== undefined &&
          count > 0 && (
            <>
              <DatabaseList databases={myDatabases} myDatabase />
              <DatabaseList databases={otherDatabases} />
            </>
          )}
      </ul>
    </div>
  )
}

function DatabaseList({
  databases,
  myDatabase,
}: {
  databases: IDatasetInfoStringOwner[] | undefined
  myDatabase?: boolean
}) {
  return databases?.map((database, index) => (
    <div key={index} className="">
      <DatabaseName database={database} myDatabase={myDatabase} />
      <DatabaseSchema database={database} />
    </div>
  ))
}
