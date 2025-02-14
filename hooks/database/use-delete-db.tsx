import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  removeDatabase,
  selectDatabaseActiveContext,
  setDatabaseActiveContext,
  setDatabaseLoading,
} from "@/store/database"
import { setAlert } from "@/store/global"
import { INamespaceInfo, KwilTypes } from "@/utils/database-types"
import { useKwilSigner } from "../use-kwil-signer"
import { useKwilProvider } from "@/providers/WebKwilProvider"

export default function useDeleteDb(namespaceObj: INamespaceInfo) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const kwilProvider = useKwilProvider()
  const kwilSigner = useKwilSigner()
  const activeDatabaseContext = useAppSelector(selectDatabaseActiveContext)

  const triggerDeleteDb = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    e.stopPropagation() // To prevent triggering openSchema

    if (!kwilProvider || !kwilSigner || !namespaceObj) return

    const c = confirm(
      `Are you sure you want to delete '${namespaceObj.name}'?`,
    )

    if (c) {
      dispatch(
        setDatabaseLoading({
          dbid: namespaceObj.name,
          loading: true,
        }),
      )

      try {
        const deleted = await kwilProvider.execSql(
          `DROP NAMESPACE ${namespaceObj.name}`,
          {},
          kwilSigner,
          true
        )

        if (deleted) {
          dispatch(removeDatabase(namespaceObj.name))
          dispatch(
            setAlert({
              type: "success",
              text: `Namespace "${namespaceObj.name}" has now been deleted.`,
              position: "top",
            }),
          )

          // If we delete the active database, we need navigate away from this database view
          if (
            activeDatabaseContext &&
            namespaceObj.name === activeDatabaseContext.namespace
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
          dbid: namespaceObj.name,
          loading: false,
        }),
      )
    }
  }

  return triggerDeleteDb
}
