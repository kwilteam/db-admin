import { selectDatabaseSchemas, setDatabases } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getDatabases } from "@/util/api"
import { useEffect, useState } from "react"

export default function useDatabaseSchemas() {
  const dispatch = useAppDispatch()
  const databaseSchemas = useAppSelector(selectDatabaseSchemas)
  const [databaseCount, setDatabaseCount] = useState<number | undefined>()

  useEffect(() => {
    const fetchDatabases = async () => {
      if (databaseSchemas) {
        setDatabaseCount(Object.keys(databaseSchemas).length)
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
  }, [databaseCount, dispatch, databaseSchemas])

  return { databaseSchemas, databaseCount }
}
