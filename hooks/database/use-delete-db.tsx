import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  removeDatabase,
  selectDatabaseActiveContext,
  setDatabaseActiveContext,
  setDatabaseLoading,
} from "@/store/database"
import { setAlert } from "@/store/global"
import { IDatasetInfoStringOwner, KwilTypes } from "@/utils/database-types"
import { useKwilSigner } from "../use-kwil-signer"
import { useKwilProvider } from "@/providers/WebKwilProvider"

export default function useDeleteDb(databaseObject: IDatasetInfoStringOwner) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const kwilProvider = useKwilProvider()
  const kwilSigner = useKwilSigner()
  const activeDatabaseContext = useAppSelector(selectDatabaseActiveContext)

  const triggerDeleteDb = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    e.stopPropagation() // To prevent triggering openSchema

    if (!kwilProvider || !kwilSigner || !databaseObject) return

    const c = confirm(
      `Are you sure you want to delete '${databaseObject.name}'?`,
    )

    if (c) {
      dispatch(
        setDatabaseLoading({
          dbid: databaseObject.dbid,
          loading: true,
        }),
      )

      try {
        const dropBody: KwilTypes.DropBody = {
          dbid: databaseObject.dbid,
        }
        const deleted = await kwilProvider.drop(dropBody, kwilSigner, true)

        if (deleted) {
          dispatch(removeDatabase(databaseObject.dbid))
          dispatch(
            setAlert({
              type: "success",
              text: `Database "${databaseObject.name}" has now been deleted.`,
              position: "top",
            }),
          )

          // If we delete the active database, we need navigate away from this database view
          if (
            activeDatabaseContext &&
            databaseObject.dbid === activeDatabaseContext.dbid
          ) {
            dispatch(setDatabaseActiveContext(undefined))
            router.push("/databases")
          }
        }
      } catch (error) {
        dispatch(
          setAlert({
            type: "error",
            text: "Database drop failed. Please try again.",
            position: "top",
          }),
        )
      }

      dispatch(
        setDatabaseLoading({
          dbid: databaseObject.dbid,
          loading: false,
        }),
      )
    }
  }

  return triggerDeleteDb
}
