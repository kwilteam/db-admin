import { useCallback, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectMethod, selectDatabaseObject } from "@/store/database"
import { useKwilProvider } from "@/providers/WebKwilProvider"
import { useKwilSigner } from "../use-kwil-signer"
import { Utils } from "@kwilteam/kwil-js"
import { ItemType, KwilTypes } from "@/utils/database-types"
import { ModalEnum, setAlert, setModal } from "@/store/global"
import { getDetailsErrorMessage } from "@/utils/error-message"
import { IColumn, getColumnsFromProcedure } from "@/utils/data-table"

interface IDatabaseMethodProps {
  dbid: string
  methodName: string
  type: ItemType
}

export const useDatabaseMethod = ({
  dbid,
  methodName,
  type
}: IDatabaseMethodProps) => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Object[] | undefined>(undefined)
  const [columns, setColumns] = useState<IColumn[] | undefined>(undefined)
  const method = useAppSelector((state) => 
    selectMethod(state, dbid, methodName, type)
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

        const mutability = method?.modifiers?.includes('VIEW')
        const actionInputs = new Utils.ActionInput()

        for (const [key, value] of Object.entries(formValues)) {
          actionInputs.put(key, value as string)
        }
 
        const actionBody: KwilTypes.ActionBody = {
          dbid: databaseObject.dbid,
          name: methodName,
          ...(actionInputs.toArray().length > 0 ? { inputs: [actionInputs] } : {}),
        }

        let response:
          | KwilTypes.GenericResponse<KwilTypes.MsgReceipt>
          | KwilTypes.GenericResponse<KwilTypes.TxReceipt>
          | undefined

        if (mutability) {
          response = await kwilProvider.call(actionBody)
        } else if (!mutability && kwilSigner) {
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
            setColumns(
              getColumnsFromProcedure(
                Object.keys(result[0]), 
                method && 'return_types' in method ? 
                  method.return_types : undefined
              )
            )
          }
        }

        return true
      } catch (error) {
        const errorMessage = getDetailsErrorMessage(error as Error)
        console.log(error)

        dispatch(
          setAlert({
            type: "error",
            text: errorMessage || "An error occurred",
          }),
        )
        return false
      }
    },
    [kwilProvider, kwilSigner, databaseObject, method, methodName, dispatch],
  )

  return {
    method,
    executeAction,
    data,
    columns,
  }
}
