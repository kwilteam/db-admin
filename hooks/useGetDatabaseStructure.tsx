import { setDatabaseObject, setDatabaseVisibility } from "@/store/database"
import { useAppDispatch } from "@/store/hooks"
import { getDatabaseStructure } from "@/utils/api"
import { KwilTypes } from "@/utils/database-types"

export default function useGetDbStructure() {
  const dispatch = useAppDispatch()

  const getDbStructure = async (
    database: string,
    show?: "tables" | "actions",
  ) => {
    const dbStructure: KwilTypes.Database<string> | undefined =
      await getDatabaseStructure(database)
    if (!dbStructure) return

    dispatch(
      setDatabaseObject({
        database,
        structure: dbStructure,
      }),
    )

    dispatch(
      setDatabaseVisibility({
        database,
        key: "isVisible",
        isVisible: true,
      }),
    )

    if (show) {
      dispatch(
        setDatabaseVisibility({
          database,
          key: show,
          isVisible: true,
        }),
      )
    }
  }

  return {
    getDbStructure,
  }
}
