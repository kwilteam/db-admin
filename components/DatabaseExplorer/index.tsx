"use client"

import { useMemo } from "react"
import classNames from "classnames"
import { selectActiveAccount, selectAlert } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Switch } from "@headlessui/react"
import { IDatasetInfoStringOwner } from "@/utils/database-types"
import {
  selectDatabaseFilters,
  setDataFilterSearch,
  setDataFilterShowAll,
} from "@/store/database"
import useDatabases from "@/hooks/database/useDatabases"
import DatabaseName from "./DatabaseName"
import DatabaseSchema from "./DatabaseSchema"
import Loading from "../Loading"

export default function DatabasesExplorer() {
  const alert = useAppSelector(selectAlert)
  const { databases, count } = useDatabases()
  const activeAccount = useAppSelector(selectActiveAccount)
  const databaseFilters = useAppSelector(selectDatabaseFilters)

  const myDatabases = useMemo(
    () =>
      databases.filter((db) => {
        return (
          `0x${db.owner}` === activeAccount &&
          db.name.includes(databaseFilters.search)
        )
      }),
    [databases, activeAccount, databaseFilters.search],
  )

  const sharedDatabases = useMemo(
    () =>
      databases.filter((db) => {
        return (
          `0x${db.owner}` !== activeAccount &&
          db.name.includes(databaseFilters.search)
        )
      }),
    [databases, activeAccount, databaseFilters.search],
  )

  return (
    <div
      test-id="database-explorer"
      className="w-full bg-white lg:max-h-screen lg:min-h-screen lg:overflow-scroll"
    >
      <ul className="mt-2 flex flex-col">
        {count === undefined && alert === undefined && (
          <Loading className="mt-4 flex justify-center" />
        )}

        {count === 0 && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-sm font-semibold text-slate-500">
              No databases were found
            </p>
            <p className="text-xs text-slate-400">
              Deploy a database to get started
            </p>
          </div>
        )}

        {count && (
          <>
            <DatabaseFilters />
            <DatabaseList databases={myDatabases} myDatabase />
            <DatabaseList databases={sharedDatabases} />
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
  databases: IDatasetInfoStringOwner[]
  myDatabase?: boolean
}) {
  return databases.map((database, index) => (
    <div key={index} className="">
      <DatabaseName database={database} myDatabase={myDatabase} />
      <DatabaseSchema database={database} />
    </div>
  ))
}

function DatabaseFilters() {
  const dispatch = useAppDispatch()
  const databaseFilters = useAppSelector(selectDatabaseFilters)

  const handleToggleShowAll = () => {
    dispatch(setDataFilterShowAll(!databaseFilters.showAll))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDataFilterSearch(event.target.value))
  }

  const clearSearch = () => {
    dispatch(setDataFilterSearch(""))
  }

  return (
    <div className="mx-2 mb-2 mt-1 flex items-center gap-2">
      <div className="relative w-5/6">
        <input
          type="text"
          value={databaseFilters.search}
          onChange={handleSearchChange}
          className="h-12 w-full rounded-md border p-1 pl-2 text-sm"
          placeholder="Filter databases..."
        />
        {databaseFilters.search && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-sm text-slate-400 hover:text-slate-600"
          >
            x
          </button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-xs text-slate-400">All DBs</span>
        <Switch
          checked={databaseFilters.showAll}
          onChange={handleToggleShowAll}
          className={classNames(
            databaseFilters.showAll ? "bg-kwil" : "bg-slate-200",
            "relative inline-flex h-6 w-11 items-center rounded-full",
          )}
        >
          <span
            className={classNames(
              databaseFilters.showAll ? "translate-x-6" : "translate-x-1",
              "inline-block h-4 w-4 transform rounded-full bg-white transition",
            )}
          />
        </Switch>
      </div>
    </div>
  )
}
