import { useEffect, useMemo, useState } from "react"
import { selectActiveAccount, setAlert } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { loadPinned, selectDbOwner, selectNamespaces } from "@/store/database"
import useFetchNamespaces from "@/hooks/database/use-fetch-databases"
import useDatabasePins from "./use-database-pins"
import useFetchOwner from "./use-fetch-owner"

// Delay update of loading state to avoid flickering
const loadingDelay = 1000

export default function useDatabases() {
  const { fetchNamespaces, loading: fetchNamespacesLoading } = useFetchNamespaces()
  const { fetchOwner } = useFetchOwner()
  const namespaces = useAppSelector(selectNamespaces)
  const [namespacesLoading, setNamespacesLoading] = useState(true)
  const { pinned } = useDatabasePins();
  const activeAccount = useAppSelector(selectActiveAccount)
  const dbOwner = useAppSelector(selectDbOwner)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadPinned())
  }, [dispatch])

  const pinnedNamespaces = useMemo(() => {
    return namespaces?.filter((n) => {
      return pinned?.includes(n.name)
    })
  }, [pinned, namespaces])


  const loadedNamespaces = useMemo(() => {
    if (namespaces) {
      setNamespacesLoading(false)
    }

    return namespaces
  }, [namespaces])

  useEffect(() => {
    try {
      setNamespacesLoading(true)
      fetchNamespaces()
      fetchOwner()
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setNamespacesLoading(false)
      }, loadingDelay)
    }
  }, [fetchNamespaces])

  return {
    loadedNamespaces,
    namespacesLoading,
    fetchNamespacesLoading,
    count: namespaces?.length,
    pinnedNamespaces,
    isDbOwner: dbOwner.toLowerCase() === activeAccount?.toLowerCase()
  }
}
