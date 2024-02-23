import { useCallback } from "react"
import { selectDatabaseFilters, setDatabases } from "@/store/database"
import { selectActiveAccount, setAlert } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { bytesToHex } from "@kwilteam/kwil-js/dist/utils/serial"
import { IDatasetInfoStringOwner } from "@/utils/database-types"
import { useKwilProvider } from "@/providers/WebKwilProvider"

export default function useDatabases() {
  const dispatch = useAppDispatch()
  const kwilProvider = useKwilProvider()
  const databaseFilters = useAppSelector(selectDatabaseFilters)
  const activeAccount = useAppSelector(selectActiveAccount)

  const fetchDatabases = useCallback(async () => {
    try {
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
        return
      }

      if (_databases && _databases.length === 0) {
        dispatch(setDatabases([]))
        return
      }

      const databases: IDatasetInfoStringOwner[] = _databases.map(
        (database) => {
          return { ...database, owner: bytesToHex(database.owner) }
        },
      )

      dispatch(setDatabases(databases))
    } catch (error) {
      dispatch(
        setAlert({
          type: "error",
          text: "Failed to load databases. Please try again.",
          position: "top",
        }),
      )

      console.error(error)
    }
  }, [dispatch, kwilProvider, databaseFilters, activeAccount])

  return fetchDatabases
}
