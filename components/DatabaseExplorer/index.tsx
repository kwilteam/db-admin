"use client"
import { Fragment, useEffect } from "react"
import { DatabaseItem } from "./DatabaseItem"
import { DatabaseSchema } from "./DatabaseSchema"
import useDatabaseSchemas from "@/hooks/useDatabaseSchemas"
import Loading from "../Loading"
import { useParams, usePathname } from "next/navigation"
import { useAppDispatch } from "@/store/hooks"
import { setDatabaseVisibility } from "@/store/database"
import useGetSchema from "@/hooks/useGetSchema"

interface IParams {
  db?: string
}

// DatabasesExplorer Component
export default function DatabasesExplorer() {
  const { databaseSchemas, databaseCount } = useDatabaseSchemas()
  const { getSchema } = useGetSchema()
  const params: IParams = useParams()

  const { db } = params

  useEffect(() => {
    if (db) {
      getSchema(db)
    }
  }, [db])

  return (
    <div
      className="max-h-screen min-h-screen w-full overflow-scroll bg-slate-50/30"
      id="database-explorer"
    >
      <ul className="flex flex-col">
        {databaseSchemas &&
          Object.keys(databaseSchemas).map((database, index) => (
            <Fragment key={index}>
              <DatabaseItem database={database} />
              <DatabaseSchema database={database} />
            </Fragment>
          ))}
        {databaseCount === 0 && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-2xl font-bold text-gray-500">
              No databases found
            </p>
            <p className="text-gray-400">Add a database to get started</p>
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
