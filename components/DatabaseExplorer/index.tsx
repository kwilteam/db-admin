"use client"

import { useMemo } from "react"
import { selectActiveAccount, selectAlert } from "@/store/global"
import { useAppSelector } from "@/store/hooks"
import { IDatasetInfoStringOwner } from "@/utils/database-types"
import { selectDatabaseFilters } from "@/store/database"
import useDatabases from "@/hooks/database/useDatabases"
import DatabaseName from "./DatabaseName"
import DatabaseSchema from "./DatabaseSchema"
import DatabaseFilters from "./DatabaseFilters"
import Loading from "../Loading"

export default function DatabasesExplorer() {
  const alert = useAppSelector(selectAlert)
  const { databases } = useDatabases()
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

  return (
    <div
      test-id="database-explorer"
      className="w-full bg-white lg:max-h-screen lg:min-h-screen lg:overflow-scroll"
    >
      <ul className="mt-2 flex flex-col">
        <DatabaseFilters />

        {count === undefined && alert === undefined && (
          <Loading className="mt-4 flex justify-center" />
        )}

        {(count === 0 ||
          (myDatabases &&
            myDatabases.length === 0 &&
            otherDatabases &&
            otherDatabases.length === 0 &&
            count !== undefined)) && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-sm font-semibold text-slate-500">
              No databases were found
            </p>
          </div>
        )}

        {count !== undefined && count > 0 && (
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
