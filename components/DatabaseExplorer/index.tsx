"use client"
import { Fragment, useEffect } from "react"
import DatabaseName from "./DatabaseName"
import DatabaseStructure from "./DatabaseStructure"
import useDatabaseStructures from "@/hooks/useDatabaseStructures"
import Loading from "../Loading"
import useGetDbStructure from "@/hooks/useGetDatabaseStructure"
import useDatabaseParams from "@/hooks/useDatabaseParams"
import Alert from "../Alert"

export default function DatabasesExplorer() {
  const { databaseStructures, databaseCount, error } = useDatabaseStructures()
  const { getDbStructure } = useGetDbStructure()
  const { db, table, action } = useDatabaseParams()

  useEffect(() => {
    if (db) {
      const show = table ? "tables" : action ? "actions" : undefined
      getDbStructure(db, show)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db])

  return (
    <div
      test-id="database-explorer"
      className="w-full bg-white lg:max-h-screen lg:min-h-screen lg:overflow-scroll"
    >
      <ul className="mt-2 flex flex-col">
        {databaseStructures &&
          Object.keys(databaseStructures).map((database, index) => (
            <Fragment key={index}>
              <DatabaseName database={database} />
              <DatabaseStructure database={database} />
            </Fragment>
          ))}
        {databaseCount === 0 && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-md font-bold text-slate-500">
              No databases found
            </p>
            <p className="text-sm text-slate-400">
              Add a database to get started
            </p>
          </div>
        )}
        {databaseCount === undefined && error === undefined && (
          <Loading className="mt-4 flex justify-center" />
        )}
        {error && (
          <Alert
            text="Error connecting to Kwil Provider"
            type="error"
            className="mx-2"
          />
        )}
      </ul>
    </div>
  )
}
