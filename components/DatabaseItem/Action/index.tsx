"use client"

import { useCallback, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectAction, selectDatabaseObject } from "@/store/database"
import { ModalEnum, setAlert, setModal } from "@/store/global"
import { Utils } from "@kwilteam/kwil-js"
import { ItemType, KwilTypes } from "@/utils/database-types"
import { useKwilSigner } from "@/hooks/kwil/useKwilSigner"
import { useKwilProvider } from "@/providers/WebKwilProvider"
import Loading from "@/components/Loading"
import DataTable from "@/components/DatabaseItem/DataTable"
import ActionForm from "./Form"
import ActionStatements from "./Statements"

interface IActionProps {
  dbid: string
  actionName: string
}

export default function Action({ dbid, actionName }: IActionProps) {
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Object[] | undefined>(undefined)
  const [columns, setColumns] = useState<string[] | undefined>(undefined)
  const action = useAppSelector((state) =>
    selectAction(state, dbid, actionName),
  )
  const kwilProvider = useKwilProvider()
  const kwilSigner = useKwilSigner()
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )

  const executeAction = useCallback(
    async (
      formValues: Record<string, string>,
    ): Promise<boolean | undefined> => {
      if (!kwilProvider || !databaseObject) {
        alert("writeKwilProvider or databaseObject is undefined")
        return false
      }

      try {
        setData(undefined)
        setColumns(undefined)

        const mutability = action?.mutability
        const actionInputs = new Utils.ActionInput()

        for (const [key, value] of Object.entries(formValues)) {
          actionInputs.put(key, value as string)
        }

        const actionBody: KwilTypes.ActionBody = {
          dbid: databaseObject.dbid,
          action: actionName,
          inputs: [actionInputs],
        }

        let response:
          | KwilTypes.GenericResponse<KwilTypes.MsgReceipt>
          | KwilTypes.GenericResponse<KwilTypes.TxReceipt>
          | undefined

        if (mutability === "view") {
          response = await kwilProvider.call(actionBody)
        } else if (mutability === "update" && kwilSigner) {
          response = await kwilProvider.execute(actionBody, kwilSigner, true)
        } else {
          dispatch(setModal(ModalEnum.CONNECT))
          return
        }

        if (response && response.status !== 200) {
          dispatch(
            setAlert({
              text: "There was a problem executing this action.",
              type: "error",
            }),
          )

          return false
        }

        // If the action was successful, show a success message
        dispatch(
          setAlert({ text: "Action executed successfully!", type: "success" }),
        )

        // If the action returned data, show it in a table
        if (response.data && "result" in response.data) {
          const result = response.data.result
          if (result && result.length > 0) {
            // TODO: The result is being returned as Nillable<String> but is actually Object[]
            setData(result as unknown as Object[])
            setColumns(Object.keys(result[0]))
          }
        }

        return true
      } catch (error) {
        const err = error as Error
        console.error("executeAction error", err.message)
        console.error(err)
        dispatch(
          setAlert({
            text: "There was a problem executing this action: " + err.message,
            type: "error",
          }),
        )
        return false
      }
    },
    [kwilProvider, kwilSigner, databaseObject, action, actionName, dispatch],
  )

  const statements = action?.statements

  if (!action) return <Loading className="flex justify-center pt-4" />

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
