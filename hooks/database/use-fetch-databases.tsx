import { useCallback, useState } from "react"
import { setDatabases } from "@/store/database"
import { selectActiveAccount, setAlert } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { INamespaceInfo } from "@/utils/database-types"
import { useKwilProvider } from "@/providers/WebKwilProvider"

export default function useFetchNamespaces() {
  const dispatch = useAppDispatch()
  const kwilProvider = useKwilProvider()
  const activeAccount = useAppSelector(selectActiveAccount)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchNamespaces = useCallback(async () => {
    try {
      setLoading(true)
      const namespacesRes = await kwilProvider?.selectQuery<INamespaceInfo>("SELECT name FROM info.namespaces")
      const _namespaces = namespacesRes?.data

      if (namespacesRes === undefined || _namespaces === undefined) {
        dispatch(setDatabases(undefined))
        setLoading(false)
        return
      }

      if (_namespaces && _namespaces.length === 0) {
        dispatch(setDatabases([]))
        setLoading(false)
        return
      }

      const databases: INamespaceInfo[] = _namespaces.map(
        (database) => {
          return { ...database, name: database.name }
        },
      )

      dispatch(setDatabases(databases))
      setLoading(false)
    } catch (error) {
      dispatch(
        setAlert({
          type: "error",
          text: "Failed to load databases. Please try again.",
          position: "top",
        }),
      )

      setLoading(false)

      console.error(error)
    }
  }, [dispatch, kwilProvider, activeAccount])

  return { fetchNamespaces, loading }
}
