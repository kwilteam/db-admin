"use client"

import { selectAlert } from "@/store/global"
import { useAppSelector } from "@/store/hooks"
import DatabaseName from "./DatabaseName"
import DatabaseSchema from "./DatabaseSchema"
import useDatabases from "@/hooks/database/useDatabases"
import Loading from "../Loading"

export default function DatabasesExplorer() {
  const alert = useAppSelector(selectAlert)
  const { databases, count } = useDatabases()

  return (
    <div
      test-id="database-explorer"
      className="w-full bg-white lg:max-h-screen lg:min-h-screen lg:overflow-scroll"
    >
      <ul className="mt-2 flex flex-col">
        {databases &&
          databases.map((database, index) => (
            <div key={index} className="">
              <DatabaseName database={database} />
              <DatabaseSchema database={database} />
            </div>
          ))}
        {count === 0 && (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-md font-bold text-slate-500">
              No databases found
            </p>
            <p className="text-sm text-slate-400">
              Add a database to get started
            </p>
          </div>
        )}
        {count === undefined && alert === undefined && (
          <Loading className="mt-4 flex justify-center" />
        )}
      </ul>
    </div>
  )
}
