import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  removeDatabase,
  selectDatabaseActiveContext,
  setDatabaseActiveContext,
  setDatabaseLoading,
} from "@/store/database"
import { deleteDatabase } from "@/utils/api"
import { setAlert } from "@/store/global"

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
      dispatch(
        setDatabaseLoading({
          database,
          loading: true,
        }),
      )

      try {
        const deleted = await deleteDatabase(database)

        if (deleted) {
          dispatch(removeDatabase(database))
          dispatch(
            setAlert({
              type: "success",
              text: `Database "${database}" has now been deleted.`,
              position: "top",
            }),
          )

          // If we delete the active database, we need navigate away from this database view
          if (databaseContext && database === databaseContext.database) {
            dispatch(setDatabaseActiveContext(undefined))
            router.push("/databases")
          }
        }
      } catch (error) {
        console.error(error)
        dispatch(
          setAlert({
            type: "error",
            text: "Database could not be deleted. Please refresh and try again.",
            position: "top",
          }),
        )
      }

      dispatch(
        setDatabaseLoading({
          database,
          loading: false,
        }),
      )

      setTimeout(() => {
        dispatch(setAlert(undefined))
      }, 3000)
    }
  }

  return triggerDeleteDb
}
