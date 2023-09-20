"use client"
import { Dispatch, Fragment, SetStateAction, useEffect } from "react"
import DatabaseName from "./DatabaseName"
import DatabaseStructure from "./DatabaseStructure"
import useDatabaseStructures from "@/hooks/useDatabaseStructures"
import Loading from "../Loading"
import useGetDbStructure from "@/hooks/useGetDatabaseStructure"
import useDatabaseParams from "@/hooks/useDatabaseParams"

// DatabasesExplorer Component
export default function DatabasesExplorer({
  setIsMenuOpen = () => {},
}: {
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}) {
  const { databaseStructures, databaseCount } = useDatabaseStructures()
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
    <div className="w-full bg-white lg:max-h-screen lg:min-h-screen lg:overflow-scroll">
      <ul className="flex flex-col">
        {databaseStructures &&
          Object.keys(databaseStructures).map((database, index) => (
            <Fragment key={index}>
              <DatabaseName database={database} />
              <DatabaseStructure
                database={database}
                setIsMenuOpen={setIsMenuOpen}
              />
            </Fragment>
          ))}
        {databaseCount === 0 && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-2xl font-bold text-slate-500">
              No databases found
            </p>
            <p className="text-slate-400">Add a database to get started</p>
          </div>
        )}
        {databaseCount === undefined && (
          <div className="mt-4 flex justify-center">
            <Loading />
          </div>
        )}
      </ul>
    </div>
  )
}
