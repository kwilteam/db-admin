import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  removeDatabase,
  selectDatabaseActiveContext,
  setDatabaseActiveContext,
  setDatabaseLoading,
} from "@/store/database"
import { setAlert } from "@/store/global"
import { IDatasetInfoWithoutOwner, KwilTypes } from "@/utils/database-types"
import { useKwilProvider } from "../kwil/useKwilProvider"
import { useKwilSigner } from "../kwil/useKwilSigner"

export default function useDeleteDb(databaseObject: IDatasetInfoWithoutOwner) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { writeKwilProvider } = useKwilProvider()
  const kwilSigner = useKwilSigner()
  const activeDatabaseContext = useAppSelector(selectDatabaseActiveContext)

  const triggerDeleteDb = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    database: string,
  ) => {
    e.stopPropagation() // To prevent triggering openSchema

    if (!writeKwilProvider || !kwilSigner || !databaseObject) return

    const c = confirm(`Are you sure you want to delete '${database}'?`)

    if (c) {
      dispatch(
        setDatabaseLoading({
          database,
          loading: true,
        }),
      )

      try {
        const dropBody: KwilTypes.DropBody = {
          dbid: databaseObject.dbid,
        }
        const deleted = await writeKwilProvider?.drop(
          dropBody,
          kwilSigner,
          true,
        )

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
          if (
            activeDatabaseContext &&
            database === activeDatabaseContext.database
          ) {
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
    }
  }

  return triggerDeleteDb
}
