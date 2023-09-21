"use client"

import { useState } from "react"
import { executeAction as executeActionApi } from "@/utils/api"
import { useAppSelector } from "@/store/hooks"
import { selectAction } from "@/store/database"
import Loading from "@/components/Loading"
import DataTable from "@/components/DataView/DataTable"
import ActionForm from "./Form"
import ActionStatements from "./Statements"
import Alert from "@/components/Alert"

interface IActionProps {
  database: string
  actionName: string
}

export default function Action({ database, actionName }: IActionProps) {
  const [data, setData] = useState<Object[] | undefined>(undefined)
  const [actionError, setActionError] = useState<boolean | undefined>(undefined)
  const [actionSuccess, setActionSuccess] = useState<boolean | undefined>(
    undefined,
  )
  const action = useAppSelector((state) =>
    selectAction(state, database, actionName),
  )

  if (!action)
    return (
      <div className="flex justify-center pt-4">
        <Loading />
      </div>
    )

  const executeAction = async (formValues: Record<string, string>) => {
    const result = await executeActionApi(database, actionName, formValues)

    if (!result) {
      setActionError(true)
      setTimeout(() => {
        setActionError(undefined)
      }, 5000)
      return
    }

    setActionSuccess(true)
    setData(result)

    setTimeout(() => {
      setActionSuccess(undefined)
    }, 5000)
  }

  const statements = action?.statements

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-6 rounded-md bg-slate-100/60  p-2">
        <ActionForm
          database={database}
          action={action}
          executeAction={executeAction}
        />
        <ActionStatements statements={statements} />
      </div>
      <div className="mt-2">
        {actionError && <Alert text="Error executing action." type="error" />}
        {actionSuccess && (
          <Alert text="Action executed successfully." type="success" />
        )}
      </div>
      <div className="mt-2">
        {data && <DataTable data={data} action={true} />}
      </div>
    </div>
  )
}
