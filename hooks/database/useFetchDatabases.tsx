import { useCallback, useState } from "react"
import { selectDatabaseFilters, setDatabases } from "@/store/database"
import { selectActiveAccount, setAlert } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { bytesToHex } from "@kwilteam/kwil-js/dist/utils/serial"
import { IDatasetInfoStringOwner } from "@/utils/database-types"
import { useKwilProvider } from "@/providers/WebKwilProvider"

export default function useFetchDatabases() {
  const dispatch = useAppDispatch()
  const kwilProvider = useKwilProvider()
  const databaseFilters = useAppSelector(selectDatabaseFilters)
  const activeAccount = useAppSelector(selectActiveAccount)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchDatabases = useCallback(async () => {
    try {
      setLoading(true)
      let databasesResponse
      if (databaseFilters.includeAll) {
        databasesResponse = await kwilProvider?.listDatabases()
      } else if (activeAccount) {
        databasesResponse = await kwilProvider?.listDatabases(activeAccount)
      } else {
        databasesResponse = await kwilProvider?.listDatabases()
      }

      const _databases = databasesResponse?.data

      if (databasesResponse === undefined || _databases === undefined) {
        dispatch(setDatabases(undefined))
        setLoading(false)
        return
      }

      if (_databases && _databases.length === 0) {
        dispatch(setDatabases([]))
        setLoading(false)
        return
      }

      const databases: IDatasetInfoStringOwner[] = _databases.map(
        (database) => {
          return { ...database, owner: bytesToHex(database.owner) }
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
  }, [dispatch, kwilProvider, databaseFilters, activeAccount])

  return { fetchDatabases, loading }
}
