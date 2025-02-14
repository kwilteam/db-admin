"use client"
import { ItemType } from "@/utils/database-types"
import { useDatabaseMethod } from "@/hooks/database/use-database-action"
import Loading from "@/components/Loading"
import DataTable from "@/components/DatabaseItem/DataTable"
import MethodForm from "./Form"
import MethodStatements from "./Statements"

interface IMethodProps {
  dbid: string
  methodName: string
  type: ItemType
}

/**
 * Method is an action or procedure in Kwil.
 */
export default function Method({ dbid, methodName, type }: IMethodProps) {
  const { method, data, columns, executeAction } = useDatabaseMethod({
    dbid,
    methodName,
    type,
  })
  const statements = [method?.raw_statement || ""]

  if (!method) return <Loading className="flex justify-center pt-4" />

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 rounded-md bg-slate-100/60 p-2 md:flex-row md:gap-6">
        <MethodStatements statements={statements} methodType={type} />
        <MethodForm method={method} executeAction={executeAction} type={type} />
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
