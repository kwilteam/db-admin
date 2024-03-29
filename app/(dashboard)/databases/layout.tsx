"use client"

import { useEffect } from "react"
import { useAppSelector } from "@/store/hooks"
import { selectDatabaseObject } from "@/store/database"
import { ItemTypes } from "@/utils/database-types"
import useDatabaseSchema from "@/hooks/database/use-database-schema"
import useDatabaseParams from "@/hooks/database/use-database-params"
import DatabaseExplorer from "@/components/DatabaseExplorer"

export default function DatabasesLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const { getSchema } = useDatabaseSchema()
  const { dbid, table, action, query } = useDatabaseParams()
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid || ""),
  )

  // This will load the schema for the selected database for direct routing
  useEffect(() => {
    if (dbid && databaseObject) {
      let show: ItemTypes | undefined

      if (table) {
        show = ItemTypes.TABLES
      } else if (action) {
        show = ItemTypes.ACTIONS
      } else if (query) {
        show = ItemTypes.QUERIES
      }

      getSchema(databaseObject, show)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbid, databaseObject])

  return (
    <div className="flex flex-row">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <DatabaseExplorer />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
