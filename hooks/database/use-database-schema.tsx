import { useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  setDatabaseActiveContext,
  setDatabaseLoading,
  setDatabaseSchema,
  setDatabaseVisibility,
} from "@/store/database"
import { useAppDispatch } from "@/store/hooks"
import { IActionInfo, INamespaceInfo, INamespaceItems, ITableInfo, ItemTypes } from "@/utils/database-types"
import { useKwilProvider } from "@/providers/WebKwilProvider"

export default function useDatabaseSchema() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const kwilProvider = useKwilProvider()

  const getSchema = useCallback(
    async (namespace: INamespaceInfo, showItem?: ItemTypes) => {
      if (!kwilProvider || !dispatch || !router) return

      try {
        dispatch(
          setDatabaseLoading({
            dbid: namespace.name,
            loading: true,
          }),
        )

        const tableRes = await kwilProvider.selectQuery<ITableInfo>(
          'SELECT name FROM info.tables WHERE namespace = $n',
          {
            $n: namespace.name
          }
        )

        if(tableRes.data === undefined) {
          throw new Error(
            `Could not get tables for database ${namespace}. Response: ${JSON.stringify(
              tableRes,
            )}`,
          )
        }

        const _tables = tableRes.data

        const actionRes = await kwilProvider.selectQuery<IActionInfo>(
          'SELECT * FROM info.actions WHERE namespace = $n',
          {
            $n: namespace.name
          }
        )

        if(actionRes.data === undefined) {
          throw new Error(
            `Could not get actions for database ${namespace}. Response: ${JSON.stringify(
              actionRes,
            )}`,
          )
        }

        const _actions = actionRes.data

        const namespaceItems: INamespaceItems = {
          tables: _tables,
          actions: _actions,
        }


        dispatch(
          setDatabaseSchema({
            dbid: namespace.name,
            schema: namespaceItems,
          }),
        )

        dispatch(
          setDatabaseLoading({
            dbid: namespace.name,
            loading: false,
          }),
        )

        dispatch(
          setDatabaseVisibility({
            dbid: namespace.name,
            key: "open",
            value: true,
          }),
        )

        if (showItem) {
          dispatch(
            setDatabaseVisibility({
              dbid: namespace.name,
              key: showItem,
              value: true,
            }),
          )
        }
      } catch (error) {
        // Show error alert when schema could not be fetched?
        console.error(error)

        dispatch(setDatabaseActiveContext(undefined))
        router.push("/databases")
      }
    },
    [kwilProvider, dispatch, router],
  )

  return {
    getSchema,
  }
}
