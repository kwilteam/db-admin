"use client"

import { useEffect } from "react"
import { useAppSelector } from "@/store/hooks"
import { selectDatabaseObject } from "@/store/database"
import useDatabaseSchema from "@/hooks/database/useDatabaseSchema"
import useDatabaseParams from "@/hooks/database/useDatabaseParams"
import DatabaseExplorer from "@/components/DatabaseExplorer"

export default function DatabasesLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const { getSchema } = useDatabaseSchema()
  const { db, table, action } = useDatabaseParams()
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, db || ""),
  )

  useEffect(() => {
    if (db && databaseObject) {
      const show = table ? "tables" : action ? "actions" : undefined
      getSchema(databaseObject, show)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, databaseObject])

  return (
    <div className="flex flex-row">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <DatabaseExplorer />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
