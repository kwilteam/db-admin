import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  removeDatabase,
  selectDatabaseActiveContext,
  setDatabaseActiveContext,
} from "@/store/database"
import { deleteDatabase } from "@/utils/api"

export default function useDeleteDb() {
  const dispatch = useAppDispatch()
  const databaseContext = useAppSelector(selectDatabaseActiveContext)
  const router = useRouter()

  const triggerDeleteDb = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    database: string,
  ) => {
    e.stopPropagation() // To prevent triggering openSchema

    const c = confirm(`Are you sure you want to delete '${database}'?`)

    if (c) {
      const deleted = await deleteDatabase(database)

      if (deleted) {
        dispatch(removeDatabase(database))

        // If we delete the active database, we need navigate away from this database view
        if (databaseContext && database === databaseContext.database) {
          dispatch(setDatabaseActiveContext(undefined))
          router.push("/databases")
        }
      }
    }
  }

  return triggerDeleteDb
}
