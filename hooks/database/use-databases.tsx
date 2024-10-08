import { useEffect, useMemo, useState } from "react"
import { selectActiveAccount } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { loadPinned, selectDatabases } from "@/store/database"
import useFetchDatabases from "@/hooks/database/use-fetch-databases"
import useDatabasePins from "./use-database-pins"

// Delay update of loading state to avoid flickering
const loadingDelay = 1000

export default function useDatabases() {
  const { fetchDatabases, loading: fetchDatabasesLoading } = useFetchDatabases()
  const activeAccount = useAppSelector(selectActiveAccount)
  const databases = useAppSelector(selectDatabases)
  const [myDbsLoading, setMyDbsLoading] = useState(true)
  const [otherDbsLoading, setOtherDbsLoading] = useState(true)
  const { pinned } = useDatabasePins();

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadPinned())
  }, [dispatch])

  const pinnedDbs = useMemo(() => {
    return databases?.filter((db) => {
      return pinned?.includes(db.dbid)
    })
  }, [pinned, databases])


  const myDbs = useMemo(() => {
    setMyDbsLoading(true)

    if (activeAccount === undefined || databases === undefined) {
      setMyDbsLoading(false)

      return undefined
    }

    const _myDbs = databases
      ?.filter((db) => {
        return `0x${db.owner.toLowerCase()}` === activeAccount?.toLowerCase()
      })
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1

        // If names are equal, sort by database ID
        return a.dbid < b.dbid ? -1 : a.dbid > b.dbid ? 1 : 0
      })

    setMyDbsLoading(false)
    return _myDbs
  }, [databases, activeAccount])

  const otherDbs = useMemo(() => {
    setOtherDbsLoading(true)

    if (databases === undefined) {
      setOtherDbsLoading(false)

      return undefined
    }

    const _otherDbs = databases
      .filter((db) => {
        return `0x${db.owner.toLowerCase()}` !== activeAccount?.toLowerCase()
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
  }, [databases, activeAccount])

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
    pinnedDbs,
  }
}
