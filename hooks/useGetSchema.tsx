import {
  selectDatabaseSchemas,
  setDatabaseSchema,
  setDatabaseVisibility,
} from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getDatabaseSchema } from "@/util/api"
import { KwilTypes } from "@/util/database-types"

export default function useGetSchema() {
  const dispatch = useAppDispatch()

  const getSchema = async (database: string) => {
    const schema: KwilTypes.Database<string> | undefined =
      await getDatabaseSchema(database)
    if (!schema) return

    dispatch(
      setDatabaseSchema({
        database,
        schema,
      }),
    )

    dispatch(
      setDatabaseVisibility({
        database,
        key: "isVisible",
        isVisible: true,
      }),
    )

    dispatch(
      setDatabaseVisibility({
        database,
        key: "tables",
        isVisible: true,
      }),
    )

    dispatch(
      setDatabaseVisibility({
        database,
        key: "actions",
        isVisible: true,
      }),
    )
  }

  return {
    getSchema,
  }
}
