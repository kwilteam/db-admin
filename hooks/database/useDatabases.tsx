import { useEffect, useMemo } from "react"
import { selectActiveAccount } from "@/store/global"
import { useAppSelector } from "@/store/hooks"
import { selectDatabaseFilters, selectDatabases } from "@/store/database"
import useFetchDatabases from "@/hooks/database/useFetchDatabases"

export default function useDatabases() {
  const { fetchDatabases, loading } = useFetchDatabases()
  const activeAccount = useAppSelector(selectActiveAccount)
  const databaseFilters = useAppSelector(selectDatabaseFilters)
  const databases = useAppSelector(selectDatabases)

  const myDatabases = useMemo(() => {
    if (activeAccount === undefined || databases === undefined) return undefined

    return databases
      ?.filter((db) => {
        return (
          `0x${db.owner}` === activeAccount &&
          db.name.includes(databaseFilters.search)
        )
      })
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
  }, [databases, activeAccount, databaseFilters.search])

  const otherDatabases = useMemo(() => {
    if (databaseFilters.includeAll === false || databases === undefined)
      return undefined

    return databases
      .filter((db) => {
        return (
          `0x${db.owner}` !== activeAccount &&
          db.name.includes(databaseFilters.search)
        )
      })
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
  }, [databases, activeAccount, databaseFilters])

  useEffect(() => {
    fetchDatabases()
  }, [fetchDatabases])

  return {
    myDatabases,
    otherDatabases,
    count: databases?.length,
    loading,
  }
}
