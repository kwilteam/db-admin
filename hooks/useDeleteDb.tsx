import { useAppDispatch } from "@/store/hooks"
import { removeDatabase } from "@/store/database"
import { deleteDatabase } from "@/utils/api"

export default function useDeleteDb() {
  const dispatch = useAppDispatch()

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
      }
    }
  }

  return triggerDeleteDb
}
