import { useCallback, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectDatabaseObject, selectDatabaseSchemas } from "@/store/database"
import { useKwilProvider } from "@/providers/WebKwilProvider"
import { useKwilSigner } from "../use-kwil-signer"
import { IActionInfo, ItemType, KwilTypes } from "@/utils/database-types"
import { ModalEnum, setAlert, setModal } from "@/store/global"
import { getDetailsErrorMessage } from "@/utils/error-message"
import { IColumn, cleanInputs, getColumnsFromProcedure } from "@/utils/data-table"
import { NamedParams } from "@kwilteam/kwil-js/dist/core/action"

interface IDatabaseMethodProps {
  dbid: string
  methodName: string
  type: ItemType
}

export const useDatabaseMethod = ({
  dbid,
  methodName,
  type,
}: IDatabaseMethodProps) => {
  const dispatch = useAppDispatch()
  const [data, setData] = useState<Object[] | undefined>(undefined)
  const [columns, setColumns] = useState<IColumn[] | undefined>(undefined)
  const kwilProvider = useKwilProvider()
  const kwilSigner = useKwilSigner()
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, dbid),
  )
  const schemas = useAppSelector(selectDatabaseSchemas)
  const methods = schemas[dbid]?.actions
  const method = methods?.find(m => m.name === methodName)

  const executeAction = useCallback(
    async (
      formValues: Record<string, string>,
    ): Promise<boolean | undefined> => {
      if (!kwilProvider || !databaseObject) {
        alert("writeKwilProvider or databaseObject is undefined")
        return false
      }

      const methods = schemas[dbid]?.actions

      if (!methods) {
        dispatch(
          setAlert({
            type: "error",
            text: "No actions found for this namespace",
          }),
        )
        return false
      }

      const method = methods.find(m => m.name === methodName)
      try {
        setData(undefined)
        setColumns(undefined)

        const mutability = method?.access_modifiers?.includes("VIEW")
        const actionInputs: NamedParams = {}

        for (const [key, value] of Object.entries(formValues)) {
          actionInputs[key] = cleanInputs(value)
        }

        const bodyBase = {
          namespace: databaseObject.name,
          name: methodName,
        }

        let response:
          | KwilTypes.GenericResponse<object[]>
          | KwilTypes.GenericResponse<KwilTypes.TxReceipt>
          | undefined

        if (mutability && kwilSigner) {
          // KGW and Private Mode require a signer
          const body = {
            ...bodyBase,
            inputs: Object.keys(actionInputs).length > 0 ? actionInputs : {},
          }
          response = await kwilProvider.call<object>(body, kwilSigner)
        } else if (mutability) {
          // Public Mode
          const body = {
            ...bodyBase,
            inputs: Object.keys(actionInputs).length > 0 ? actionInputs : {},
          }
          response = await kwilProvider.call(body)
        } else if (!mutability && kwilSigner) {
          const body = {
            ...bodyBase,
            ...Object.keys(actionInputs).length > 0 ? {inputs: [actionInputs]} : {}
          }
          response = await kwilProvider.execute(body, kwilSigner, true)
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
        if (response.data && !("tx_hash" in response.data)) {
          const result = response.data
          if (result && result.length > 0) {
            // TODO: The result is being returned as Nillable<String> but is actually Object[]
            setData(result as unknown as Object[])
            setColumns(
              getColumnsFromProcedure(
                Object.keys(result[0])
              ),
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
    [kwilProvider, kwilSigner, databaseObject, schemas, methodName, dispatch],
  )

  return {
    method,
    executeAction,
    data,
    columns,
  }
}
