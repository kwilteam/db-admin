import { useEffect, useState } from "react"
import {
  selectDatabaseFilters,
  selectDatabases,
  setDatabases,
} from "@/store/database"
import { selectActiveAccount, setAlert } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { bytesToHex } from "@kwilteam/kwil-js/dist/utils/serial"
import { IDatasetInfoStringOwner } from "@/utils/database-types"
import { useKwilProvider } from "../kwil/useKwilProvider"

export default function useDatabases() {
  const dispatch = useAppDispatch()
  const { readOnlyKwilProvider } = useKwilProvider()
  const databases = useAppSelector(selectDatabases)
  const databaseFilters = useAppSelector(selectDatabaseFilters)
  const activeAccount = useAppSelector(selectActiveAccount)

  useEffect(() => {
    if (!readOnlyKwilProvider || !databaseFilters) return

    const fetchDatabases = async () => {
      try {
        let databasesResponse
        if (databaseFilters.showAll) {
          databasesResponse = await readOnlyKwilProvider.listDatabases()
        } else if (activeAccount) {
          databasesResponse =
            await readOnlyKwilProvider.listDatabases(activeAccount)
        } else {
          databasesResponse = await readOnlyKwilProvider.listDatabases()
        }

        const _databases = databasesResponse?.data

        if (
          databasesResponse === undefined ||
          _databases === undefined ||
          _databases.length === 0
        ) {
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
    }
    fetchDatabases()
  }, [dispatch, readOnlyKwilProvider, databaseFilters, activeAccount])

  return { databases }
}
