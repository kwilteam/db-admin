import { useCallback, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addNewSchema, selectSavedSchemas } from "@/store/ide"
import { setSchema } from "@/utils/idb/ide"
import useIdb from "../use-idb"
import { setAlert } from "@/store/global"

export default function useCreateNewSchema() {
  const dispatch = useAppDispatch()
  const savedSchemas = useAppSelector(selectSavedSchemas)
  const [newSchemaName, setNewSchemaName] = useState<string | null>(null)
  const [isCreatingNewSchema, setIsCreatingNewSchema] = useState(false)
  const newSchemaInputRef = useRef<HTMLInputElement | null>(null)
  const idb = useIdb()

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

  const createNewSchema = useCallback(async () => {
    try {
      if (!idb) return
      if (!newSchemaName || schemaExists(newSchemaName)) {
        return
      }

      await setSchema(idb, newSchemaName, "")
      dispatch(addNewSchema(newSchemaName))
    } catch (error) {
      dispatch(
        setAlert({
          type: "error",
          text: "Failed to create new schema due to an unexpected error. Please try again.",
        }),
      )
    } finally {
      setIsCreatingNewSchema(false)
      setNewSchemaName(null)
    }
  }, [newSchemaName, schemaExists, dispatch, idb])

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
