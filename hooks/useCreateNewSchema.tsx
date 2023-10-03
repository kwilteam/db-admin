import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addNewSchema, selectSavedSchemas } from "@/store/ide"
import { saveSchemaContent } from "@/utils/api"

import { useEffect, useRef, useState } from "react"

export default function useCreateNewSchema() {
  const dispatch = useAppDispatch()
  const savedSchemas = useAppSelector(selectSavedSchemas)
  const [newSchemaName, setNewSchemaName] = useState<string | null>(null)
  const [isCreatingNewSchema, setIsCreatingNewSchema] = useState(false)
  const newSchemaInputRef = useRef<HTMLInputElement | null>(null)

  const newSchemaNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let schemaName = event.target.value
    // Remove any special characters that could not be saved on any file system
    schemaName = schemaName.replace(/[\\\/:*?"<>|,`]/g, "")
    setNewSchemaName(schemaName)
  }

  const newSchemaNameSubmit = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" && newSchemaName) {
      createNewSchema()
    }
  }

  const newSchemaNameBlur = () => {
    if (newSchemaName) {
      createNewSchema()
    } else {
      setIsCreatingNewSchema(false)
    }
  }

  const createNewSchema = () => {
    if (!newSchemaName || schemaExists(newSchemaName)) {
      return
    }
    console.log(
      "Creating new schema: ",
      newSchemaName,
      savedSchemas,
      schemaExists(newSchemaName),
    )

    dispatch(addNewSchema(newSchemaName))
    saveSchemaContent(newSchemaName, "")
    setIsCreatingNewSchema(false)
    setNewSchemaName(null)
  }

  const schemaExists = (newSchemaName: string) => {
    if (savedSchemas.includes(newSchemaName)) {
      return true
    }

    return false
  }

  useEffect(() => {
    if (isCreatingNewSchema) {
      newSchemaInputRef.current?.focus()
    }
  }, [isCreatingNewSchema])

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
