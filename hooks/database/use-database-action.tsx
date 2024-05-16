import { useCallback, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectAction, selectDatabaseObject } from "@/store/database"
import { useKwilProvider } from "@/providers/WebKwilProvider"
import { useKwilSigner } from "../use-kwil-signer"
import { Utils } from "@lukelamey/kwil-js"
import { KwilTypes } from "@/utils/database-types"
import { ModalEnum, setAlert, setModal } from "@/store/global"
import { getDetailsErrorMessage } from "@/utils/error-message"

interface IDatabaseActionProps {
  dbid: string
  actionName: string
}

export const useDatabaseAction = ({
  dbid,
  actionName,
}: IDatabaseActionProps) => {
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

        const mutability = action?.modifiers?.includes('VIEW')
        const actionInputs = new Utils.ActionInput()

        for (const [key, value] of Object.entries(formValues)) {
          actionInputs.put(key, value as string)
        }
 
        const actionBody: KwilTypes.ActionBody = {
          dbid: databaseObject.dbid,
          name: actionName,
          inputs: [actionInputs],
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
            setColumns(Object.keys(result[0]))
          }
        }

        return true
      } catch (error) {
        const errorMessage = getDetailsErrorMessage(error as Error)

        dispatch(
          setAlert({
            type: "error",
            text: errorMessage || "An error occurred",
          }),
        )
        return false
      }
    },
    [kwilProvider, kwilSigner, databaseObject, action, actionName, dispatch],
  )

  return {
    action,
    executeAction,
    data,
    columns,
  }
}
