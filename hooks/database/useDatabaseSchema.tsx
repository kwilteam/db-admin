import { useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  setDatabaseActiveContext,
  setDatabaseLoading,
  setDatabaseSchema,
  setDatabaseVisibility,
} from "@/store/database"
import { useAppDispatch } from "@/store/hooks"
import { useKwilProvider } from "../kwil/useKwilProvider"
import { IDatasetInfoWithoutOwner } from "@/utils/database-types"

export default function useDatabaseSchema() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { readOnlyKwilProvider } = useKwilProvider()

  const getSchema = useCallback(
    async (database: IDatasetInfoWithoutOwner, show?: "tables" | "actions") => {
      if (!readOnlyKwilProvider || !dispatch || !router) return

      console.log("getSchema", database, show)

      try {
        dispatch(
          setDatabaseLoading({
            database: database.name,
            loading: true,
          }),
        )

        const schemaRes = await readOnlyKwilProvider.getSchema(database.dbid)

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
            database: database.name,
            schema: schemaRes.data,
          }),
        )

        dispatch(
          setDatabaseLoading({
            database: database.name,
            loading: false,
          }),
        )

        dispatch(
          setDatabaseVisibility({
            database: database.name,
            key: "isVisible",
            isVisible: true,
          }),
        )

        if (show) {
          dispatch(
            setDatabaseVisibility({
              database: database.name,
              key: show,
              isVisible: true,
            }),
          )
        }
      } catch (error) {
        // TODO: show error alert when schema could not be fetched
        console.error(error)

        dispatch(setDatabaseActiveContext(undefined))
        router.push("/databases")
      }
    },
    [readOnlyKwilProvider, dispatch, router],
  )

  return {
    getSchema,
  }
}
