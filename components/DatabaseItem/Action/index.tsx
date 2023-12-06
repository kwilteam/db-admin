"use client"

import { useState } from "react"
import { executeAction as executeActionApi } from "@/utils/api"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectAction } from "@/store/database"
import { setAlert } from "@/store/global"
import Loading from "@/components/Loading"
import DataTable from "@/components/DatabaseItem/DataTable"
import ActionForm from "./Form"
import ActionStatements from "./Statements"

interface IActionProps {
  database: string
  actionName: string
}

export default function Action({ database, actionName }: IActionProps) {
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Object[] | undefined>(undefined)
  const [columns, setColumns] = useState<string[] | undefined>(undefined)
  const action = useAppSelector((state) =>
    selectAction(state, database, actionName),
  )

  if (!action) return <Loading className="flex justify-center pt-4" />

  const executeAction = async (
    formValues: Record<string, string>,
  ): Promise<boolean> => {
    setData(undefined)
    setColumns(undefined)

    const result = await executeActionApi(database, actionName, formValues)

    if (result.outcome === "error") {
      dispatch(setAlert({ text: result.data as string, type: "error" }))
      setTimeout(() => {
        dispatch(setAlert(undefined))
      }, 3000)

      return false
    }

    // If the action was successful, show a success message
    dispatch(
      setAlert({ text: "Action executed successfully!", type: "success" }),
    )

    // If the action returned data, show it in a table
    if (typeof result.data === "object" && result.data.length > 0) {
      setData(result.data)
      setColumns(Object.keys(result.data[0]))
    }

    setTimeout(() => {
      dispatch(setAlert(undefined))
    }, 3000)

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
        {data && <DataTable data={data} type="action" columns={columns} />}
      </div>
    </div>
  )
}
