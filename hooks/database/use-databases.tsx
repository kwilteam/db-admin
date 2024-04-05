import { useEffect, useMemo, useState } from "react"
import { selectActiveAccount } from "@/store/global"
import { useAppSelector } from "@/store/hooks"
import { selectDatabaseFilters, selectDatabases } from "@/store/database"
import useFetchDatabases from "@/hooks/database/use-fetch-databases"

// Delay update of loading state to avoid flickering
const loadingDelay = 1000

export default function useDatabases() {
  const { fetchDatabases, loading: fetchDatabasesLoading } = useFetchDatabases()
  const activeAccount = useAppSelector(selectActiveAccount)
  const databaseFilters = useAppSelector(selectDatabaseFilters)
  const databases = useAppSelector(selectDatabases)
  const [myDbsLoading, setMyDbsLoading] = useState(true)
  const [otherDbsLoading, setOtherDbsLoading] = useState(true)

  const myDbs = useMemo(() => {
    setMyDbsLoading(true)

    if (activeAccount === undefined || databases === undefined) {
      setMyDbsLoading(false)

      return undefined
    }

    const _myDbs = databases
      ?.filter((db) => {
        return (
          `0x${db.owner.toLowerCase()}` === activeAccount?.toLowerCase() &&
          db.name.includes(databaseFilters.search)
        )
      })
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1

        // If names are equal, sort by database ID
        return a.dbid < b.dbid ? -1 : a.dbid > b.dbid ? 1 : 0
      })

    setMyDbsLoading(false)
    return _myDbs
  }, [databases, activeAccount, databaseFilters.search])

  const otherDbs = useMemo(() => {
    setOtherDbsLoading(true)

    if (
      (databaseFilters.includeAll === false && activeAccount) ||
      databases === undefined
    ) {
      setTimeout(() => {
        setOtherDbsLoading(false)
      }, loadingDelay)
      return undefined
    }

    const _otherDbs = databases
      .filter((db) => {
        return (
          `0x${db.owner.toLowerCase()}` !== activeAccount?.toLowerCase() &&
          db.name.includes(databaseFilters.search)
        )
      })
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1

        // If names are equal, sort by database ID
        return a.dbid < b.dbid ? -1 : a.dbid > b.dbid ? 1 : 0
      })

    setTimeout(() => {
      setOtherDbsLoading(false)
    }, loadingDelay)

    return _otherDbs
  }, [databases, activeAccount, databaseFilters])

  useEffect(() => {
    fetchDatabases()
  }, [fetchDatabases])

  return {
    myDbs,
    otherDbs,
    myDbsLoading,
    otherDbsLoading,
    fetchDatabasesLoading,
    count: databases?.length,
  }
}
