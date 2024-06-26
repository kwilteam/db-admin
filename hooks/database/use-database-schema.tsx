import { useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  setDatabaseActiveContext,
  setDatabaseLoading,
  setDatabaseSchema,
  setDatabaseVisibility,
} from "@/store/database"
import { useAppDispatch } from "@/store/hooks"
import { IDatasetInfoStringOwner, ItemTypes } from "@/utils/database-types"
import { useKwilProvider } from "@/providers/WebKwilProvider"

export default function useDatabaseSchema() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const kwilProvider = useKwilProvider()

  const getSchema = useCallback(
    async (database: IDatasetInfoStringOwner, showItem?: ItemTypes) => {
      if (!kwilProvider || !dispatch || !router) return

      try {
        dispatch(
          setDatabaseLoading({
            dbid: database.dbid,
            loading: true,
          }),
        )

        const schemaRes = await kwilProvider.getSchema(database.dbid)

        if (!schemaRes.data) {
          throw new Error(
            `Could not get schema for database ${database}. Response: ${JSON.stringify(
              schemaRes,
            )}`,
          )
        }

        // Remove owner from schema as Uint8Array cannot be serialized in redux
        delete (schemaRes.data as { [key: string]: any })["owner"]

        dispatch(
          setDatabaseSchema({
            dbid: database.dbid,
            schema: schemaRes.data,
          }),
        )

        dispatch(
          setDatabaseLoading({
            dbid: database.dbid,
            loading: false,
          }),
        )

        dispatch(
          setDatabaseVisibility({
            dbid: database.dbid,
            key: "open",
            value: true,
          }),
        )

        if (showItem) {
          dispatch(
            setDatabaseVisibility({
              dbid: database.dbid,
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
