import {
  setDatabaseActiveContext,
  setDatabaseLoading,
  setDatabaseObject,
  setDatabaseVisibility,
} from "@/store/database"
import { useAppDispatch } from "@/store/hooks"
import { getDatabaseStructure } from "@/utils/api"
import { KwilTypes } from "@/utils/database-types"
import { useRouter } from "next/navigation"

export default function useGetDbStructure() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const getDbStructure = async (
    database: string,
    show?: "tables" | "actions",
  ) => {
    try {
      dispatch(
        setDatabaseLoading({
          database,
          loading: true,
        }),
      )

      const dbStructure: KwilTypes.Database | undefined =
        await getDatabaseStructure(database)
      if (!dbStructure) return

      dispatch(
        setDatabaseObject({
          database,
          structure: dbStructure,
        }),
      )

      dispatch(
        setDatabaseLoading({
          database,
          loading: false,
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
    } catch (error) {
      console.error(error)

      dispatch(setDatabaseActiveContext(undefined))
      router.push("/databases")
    }
  }

  return {
    getDbStructure,
  }
}
