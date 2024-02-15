import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ModalEnum, selectModal, setAlert, setModal } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Button from "../Button"
import Input from "../Input"
import Base from "./Base"
import {
  deleteQueryFromStores,
  saveQueryToStores,
  selectQueries,
} from "@/store/database"

export default function SaveQueryModal({
  dbid,
  queryName,
  sql,
  isNewQuery,
}: {
  dbid: string
  queryName: string
  sql: string
  isNewQuery: boolean
}) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const modal = useAppSelector(selectModal)
  const [name, setName] = useState(queryName === "new" ? "" : queryName)
  const [error, setError] = useState<string[]>([])
  const queries = useAppSelector((state) => selectQueries(state, dbid))

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

  const modalBody = (
    <form onSubmit={saveQuery} className="flex flex-1 flex-col">
      <Input
        type="text"
        className="border-m mx-3 my-2 border"
        placeholder="Query Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error.length > 0}
      />

      {error.length > 0 && (
        <div className="mb-2 ml-4 flex flex-1 flex-col items-start">
          {error.map((e) => (
            <div key={e} className="text-sm text-red-500">
              {e}
            </div>
          ))}
        </div>
      )}
    </form>
  )

  const modalFooter = (
    <div className="flex justify-between px-3">
      <Button context="secondary" size="md" onClick={closeModal}>
        Cancel
      </Button>

      <Button context="primary" size="md" onClick={saveQuery}>
        Save
      </Button>
    </div>
  )

  return (
    <Base
      show={modal === ModalEnum.SAVE_QUERY}
      closeModal={closeModal}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}
