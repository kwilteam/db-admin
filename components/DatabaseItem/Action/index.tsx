"use client"

import { useState } from "react"
import { executeAction as executeActionApi } from "@/utils/api"
import { useAppSelector } from "@/store/hooks"
import { selectAction } from "@/store/database"
import Alert from "@/components/Alert"
import Loading from "@/components/Loading"
import DataTable from "@/components/DatabaseItem/DataTable"
import ActionForm from "./Form"
import ActionStatements from "./Statements"

interface IActionProps {
  database: string
  actionName: string
}

export default function Action({ database, actionName }: IActionProps) {
  const [data, setData] = useState<Object[] | undefined>(undefined)
  const [actionError, setActionError] = useState<string | undefined>(undefined)
  const [actionSuccess, setActionSuccess] = useState<boolean | undefined>(
    undefined,
  )
  const [columns, setColumns] = useState<string[] | undefined>(undefined)
  const action = useAppSelector((state) =>
    selectAction(state, database, actionName),
  )

  if (!action) return <Loading className="flex justify-center pt-4" />

  const executeAction = async (formValues: Record<string, string>) => {
    setData(undefined)
    setColumns(undefined)

    const result = await executeActionApi(database, actionName, formValues)

    if (result.outcome === "error") {
      setActionError(result.data as string)
      setTimeout(() => {
        setActionError(undefined)
      }, 3500)
      return false
    }

    setActionSuccess(true)
    if (typeof result.data === "object") {
      setData(result.data)
      console.log("result.data", result.data)
      if (result.data.length > 0) {
        setColumns(Object.keys(result.data[0]))
      }
    }

    setTimeout(() => {
      setActionSuccess(undefined)
    }, 3500)

    return true
  }

  const statements = action?.statements

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 rounded-md bg-slate-100/60 p-2 md:flex-row  md:gap-6">
        <ActionStatements statements={statements} />
        <ActionForm action={action} executeAction={executeAction} />
      </div>
      <div className="mt-2">
        {actionError && <Alert text={actionError} type="error" />}
        {actionSuccess && (
          <Alert text="Action executed successfully." type="success" />
        )}
      </div>
      <div className="mt-2">
        {data && <DataTable data={data} type="action" columns={columns} />}
      </div>
    </div>
  )
}
