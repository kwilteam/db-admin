"use client"

import { useEffect, useMemo } from "react"
import { IDatasetInfoStringOwner } from "@/utils/database-types"
import { OtherIcon, UserIcon } from "@/utils/icons"
import { selectActiveAccount, selectProviderStatus } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectDatabaseFilters,
  selectDatabases,
  setDataFilterIncludeAll,
} from "@/store/database"
import { KwilProviderStatus } from "@/store/providers"
import useFetchDatabases from "@/hooks/database/useFetchDatabases"
import DatabaseName from "./DatabaseName"
import DatabaseSchema from "./DatabaseSchema"
import DatabaseFilterSearch from "./DatabaseFilterSearch"
import Loading from "../Loading"

export default function DatabasesExplorer() {
  const fetchDatabases = useFetchDatabases()
  const providerStatus = useAppSelector(selectProviderStatus)
  const activeAccount = useAppSelector(selectActiveAccount)
  const databaseFilters = useAppSelector(selectDatabaseFilters)
  const databases = useAppSelector(selectDatabases)
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
    if (databaseFilters.includeAll === false) return []

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

  useEffect(() => {
    fetchDatabases()
  }, [fetchDatabases])

  return (
    <div
      test-id="database-explorer"
      className="w-full bg-white lg:max-h-screen lg:min-h-screen lg:overflow-scroll"
    >
      <ul className="flex flex-col">
        {providerStatus === KwilProviderStatus.Offline && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm text-red-500">Kwil Provider is offline</p>
          </div>
        )}

        {providerStatus === KwilProviderStatus.Online && (
          <DatabaseFilterSearch />
        )}

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
  const dispatch = useAppDispatch()
  const includeOtherDatabases = useAppSelector(selectDatabaseFilters).includeAll

  const setIncludeOtherDatabases = () => {
    dispatch(setDataFilterIncludeAll(!includeOtherDatabases))
  }

  return (
    <div className="flex flex-col">
      <div className="mb-1 mt-2 flex px-2 text-xs text-kwil">
        {myDatabase ? (
          <div className="flex items-center gap-1">
            <UserIcon className="h-4 w-4" />
            <span>MY DATABASES</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <OtherIcon className="h-4 w-4" />
            <span>OTHER DATABASES</span>

            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              checked={includeOtherDatabases}
              onChange={setIncludeOtherDatabases}
              className="ml-1 h-4 w-4 rounded border-gray-300 text-kwil focus:ring-kwil"
            />
          </div>
        )}
      </div>
      {databases &&
        databases.map((database, index) => (
          <div key={index} className="">
            <DatabaseName database={database} myDatabase={myDatabase} />
            <DatabaseSchema database={database} />
          </div>
        ))}

      {(myDatabase || (!myDatabase && includeOtherDatabases)) &&
        databases &&
        databases.length === 0 && (
          <div className="ml-7 flex justify-start">
            <p className="text-sm italic text-slate-500">
              No databases were found
            </p>
          </div>
        )}
    </div>
  )
}
