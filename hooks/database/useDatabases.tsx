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
  const [count, setCount] = useState<number | undefined>()

  useEffect(() => {
    if (!readOnlyKwilProvider || !databaseFilters) return

    const fetchDatabases = async () => {
      try {
        // TODO: If show only mine then include the current account address as a param
        let databasesResponse
        if (databaseFilters.showAll) {
          databasesResponse = await readOnlyKwilProvider.listDatabases()
        } else {
          databasesResponse =
            await readOnlyKwilProvider.listDatabases(activeAccount)
        }

        const _databases = databasesResponse?.data

        if (
          databasesResponse === undefined ||
          _databases === undefined ||
          _databases.length === 0
        ) {
          setCount(0)
          dispatch(setDatabases([]))
          return
        }

        const databases: IDatasetInfoStringOwner[] = _databases.map(
          (database) => {
            return { ...database, owner: bytesToHex(database.owner) }
          },
        )

        console.log("databases", databases)

        setCount(_databases.length)
        dispatch(setDatabases(databases))
      } catch (error) {
        dispatch(
          setAlert(
            {
              type: "error",
              text: "Failed to connect to Kwil Provider",
              position: "top",
            },
            false,
          ),
        )

        console.error(error)
      }
    }
    fetchDatabases()
  }, [dispatch, readOnlyKwilProvider, databaseFilters, activeAccount])

  return { databases, count }
}
