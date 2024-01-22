import { useCallback, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addNewSchema, selectSavedSchemas } from "@/store/ide"
import { saveSchemaContent } from "@/utils/api"

export default function useCreateNewSchema() {
  const dispatch = useAppDispatch()
  const savedSchemas = useAppSelector(selectSavedSchemas)
  const [newSchemaName, setNewSchemaName] = useState<string | null>(null)
  const [isCreatingNewSchema, setIsCreatingNewSchema] = useState(false)
  const newSchemaInputRef = useRef<HTMLInputElement | null>(null)

  const newSchemaNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let schemaName = event.target.value
      schemaName = schemaName.replace(/[\\\/:*?"<>|,`]/g, "")
      setNewSchemaName(schemaName)
    },
    [],
  )

  const schemaExists = useCallback(
    (newSchemaName: string) => {
      if (savedSchemas && savedSchemas.includes(newSchemaName)) {
        return true
      }

      return false
    },
    [savedSchemas],
  )

  const createNewSchema = useCallback(() => {
    if (!newSchemaName || schemaExists(newSchemaName)) {
      return
    }

    dispatch(addNewSchema(newSchemaName))
    saveSchemaContent(newSchemaName, "")
    setIsCreatingNewSchema(false)
    setNewSchemaName(null)
  }, [newSchemaName, schemaExists, dispatch])

  const newSchemaNameSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && newSchemaName) {
        createNewSchema()
      }
    },
    [newSchemaName, createNewSchema],
  )

  const newSchemaNameBlur = useCallback(() => {
    if (newSchemaName) {
      createNewSchema()
    } else {
      setIsCreatingNewSchema(false)
    }
  }, [newSchemaName, createNewSchema])

  useEffect(() => {
    if (isCreatingNewSchema) {
      newSchemaInputRef.current?.focus()
    }
  }, [isCreatingNewSchema, newSchemaInputRef])

  return {
    newSchemaName,
    newSchemaNameChange,
    newSchemaNameSubmit,
    newSchemaNameBlur,
    newSchemaInputRef,
    isCreatingNewSchema,
    setIsCreatingNewSchema,
    savedSchemas,
  }
}
