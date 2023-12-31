"use client"
import { useEffect } from "react"
import DatabaseName from "./DatabaseName"
import DatabaseStructure from "./DatabaseStructure"
import useDatabaseStructures from "@/hooks/useDatabaseStructures"
import Loading from "../Loading"
import useGetDbStructure from "@/hooks/useGetDatabaseStructure"
import useDatabaseParams from "@/hooks/useDatabaseParams"
import Alert from "../Alert"
import { selectAlert } from "@/store/global"
import { useAppSelector } from "@/store/hooks"

export default function DatabasesExplorer() {
  const { databaseStructures, databaseCount } = useDatabaseStructures()
  const { getDbStructure } = useGetDbStructure()
  const { db, table, action } = useDatabaseParams()
  const alert = useAppSelector(selectAlert)

  console.log("databaseStructures", databaseStructures)

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
            <div key={index} className="">
              <DatabaseName database={database} />
              <DatabaseStructure database={database} />
            </div>
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
        {databaseCount === undefined && alert === undefined && (
          <Loading className="mt-4 flex justify-center" />
        )}
      </ul>
    </div>
  )
}
