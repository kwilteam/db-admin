import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  deleteQueryFromStores,
  saveQueryToStores,
  selectQueries,
} from "@/store/database"
import { setAlert, setModal } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

export default function useSaveQuery(
  dbid: string,
  isNewQuery: boolean,
  queryName: string,
  sql: string,
) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const queries = useAppSelector((state) => selectQueries(state, dbid))
  const [error, setError] = useState<string[]>([])
  const [name, setName] = useState(queryName === "new" ? "" : queryName)

  const closeModal = () => {
    dispatch(setModal(undefined))
  }

  const saveQuery = (e: React.FormEvent) => {
    e.preventDefault()
    setError([])

    // Replace spaces with underscores and trim the name
    const sanitizedName = name.trim().replace(/\s+/g, "_")

    // If the name hasn't changed, close the modal
    if (!isNewQuery && name === queryName) {
      closeModal()
      return
    }

    if (!validateName(sanitizedName)) return

    // Save the query
    dispatch(saveQueryToStores({ dbid, name: sanitizedName, sql }))

    // Delete the old query if we've changed the name of an existing query
    if (!isNewQuery) {
      dispatch(deleteQueryFromStores({ dbid, name: queryName }))
    }

    // Show a success message and redirect to the new query
    dispatch(setAlert({ type: "success", text: "Query saved" }))
    router.push(`/databases/${dbid}/query/${sanitizedName}`)

    closeModal()
  }

  const validateName = (sanitizedName: string) => {
    const tempErrors: string[] = []

    // The name must be set
    if (!sanitizedName) {
      tempErrors.push("A query name is required")
    }

    if (sanitizedName === "new") {
      tempErrors.push("The query name cannot be 'new'")
    }

    // The name must be less than 30 characters
    if (sanitizedName.length > 30) {
      tempErrors.push("The query name must be less than 30 characters")
    }

    // The name must be alphanumeric
    if (!/^[a-zA-Z0-9_]*$/.test(sanitizedName)) {
      tempErrors.push("Please use only letters, numbers, and underscores")
    }

    // TODO: Only allow unique names
    if (queries.find((q) => q.name === sanitizedName)) {
      tempErrors.push("A query with that name already exists")
    }

    if (tempErrors.length > 0) {
      setError(tempErrors)
      return
    }

    return true
  }

  return { saveQuery, error, closeModal, name, setName }
}
