import { selectDatabaseStructures, setDatabases } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getDatabases } from "@/utils/api"
import { useEffect, useState } from "react"

export default function useDatabaseStructures() {
  const dispatch = useAppDispatch()
  const databaseStructures = useAppSelector(selectDatabaseStructures)
  const [databaseCount, setDatabaseCount] = useState<number | undefined>()
  const [error, setError] = useState<boolean | undefined>()

  useEffect(() => {
    const fetchDatabases = async () => {
      if (databaseStructures) {
        setDatabaseCount(Object.keys(databaseStructures).length)
        return
      }

      try {
        const _databases = await getDatabases()
        if (!_databases) {
          setDatabaseCount(0)
          return
        }

        console.log("databases", _databases)

        setDatabaseCount(Object.keys(_databases).length)
        setError(false)

        dispatch(setDatabases(_databases))
      } catch (error) {
        setError(true)
        console.error(error)
      }
    }
    fetchDatabases()
  }, [databaseCount, dispatch, databaseStructures])

  return { databaseStructures, databaseCount, error }
}
