import { selectDatabaseStructures, setDatabases } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getDatabases } from "@/utils/api"
import { useEffect, useState } from "react"

export default function useDatabaseStructures() {
  const dispatch = useAppDispatch()
  const databaseStructures = useAppSelector(selectDatabaseStructures)
  const [databaseCount, setDatabaseCount] = useState<number | undefined>()

  useEffect(() => {
    const fetchDatabases = async () => {
      if (databaseStructures) {
        setDatabaseCount(Object.keys(databaseStructures).length)
        return
      }

      const _databases = await getDatabases()

      if (!_databases) {
        setDatabaseCount(0)
        return
      }

      setDatabaseCount(Object.keys(_databases).length)

      dispatch(setDatabases(_databases))
    }
    fetchDatabases()
  }, [databaseCount, dispatch, databaseStructures])

  return { databaseStructures, databaseCount }
}
