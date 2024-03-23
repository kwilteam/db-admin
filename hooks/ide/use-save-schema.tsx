import { useState, useEffect, useCallback } from "react"
import { debounce } from "@/utils/debounce"
import { setSchema } from "@/utils/idb/ide"
import { useAppDispatch } from "@/store/hooks"
import { setSchemaContent } from "@/store/ide"
import { setAlert } from "@/store/global"
import useIdb from "../use-idb"

export default function useSaveSchema() {
  const dispatch = useAppDispatch()
  const idb = useIdb()
  const [isSaving, setIsSaving] = useState(false)

  const saveMethod = useCallback(
    async (name: string, content: string) => {
      try {
        if (!idb) return

        dispatch(
          setSchemaContent({
            name,
            content,
          }),
        )

        setIsSaving(true)

        await setSchema(idb, name, content)
      } catch (error) {
        dispatch(
          setAlert({
            type: "error",
            text: "Auto-save operation failed due to an unexpected error. Please try again.",
          }),
        )
      } finally {
        setIsSaving(false)
      }
    },
    [idb, dispatch],
  )

  const save = debounce(saveMethod, 500)

  useEffect(() => {
    return () => {
      setIsSaving(false)
    }
  }, [])

  return { save, isSaving }
}
