"use client"
import { ItemType } from "@/utils/database-types"
import { useDatabaseAction } from "@/hooks/database/use-database-action"
import Loading from "@/components/Loading"
import DataTable from "@/components/DatabaseItem/DataTable"
import ActionForm from "./Form"
import ActionStatements from "./Statements"

interface IActionProps {
  dbid: string
  actionName: string
}

export default function Action({ dbid, actionName }: IActionProps) {
  const { action, data, columns, executeAction } = useDatabaseAction({
    dbid,
    actionName,
  })
  const statements = action?.statements

  if (!action)
    return (
      <Loading data-testid="loading" className="flex justify-center pt-4" />
    )

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 rounded-md bg-slate-100/60 p-2 md:flex-row  md:gap-6">
        <ActionStatements statements={statements} />
        <ActionForm action={action} executeAction={executeAction} />
      </div>
      <div className="mt-2">
        {data && (
          <DataTable
            data={data}
            totalCount={data?.length}
            type={ItemType.ACTION}
            columns={columns}
          />
        )}
      </div>
    </div>
  )
}
