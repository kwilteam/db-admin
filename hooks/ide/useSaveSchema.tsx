import { useRef, useState, useEffect } from "react"
import { saveSchemaContent } from "@/utils/api"
import { debounce } from "@/utils/debounce"
import { useAppDispatch } from "@/store/hooks"
import { setSchemaContent } from "@/store/ide"
import { setAlert } from "@/store/global"

export default function useSaveSchema() {
  const dispatch = useAppDispatch()
  const [isSaving, setIsSaving] = useState(false)

  const save = useRef(
    debounce(async (name: string, content: string) => {
      try {
        dispatch(
          setSchemaContent({
            name,
            content,
          }),
        )

        setIsSaving(true)

        await saveSchemaContent(name, content)
      } catch (error) {
        const err = error as Error

        dispatch(
          setAlert({
            type: "error",
            text: `Auto-save failed due to: ${err.message}`,
            position: "top",
          }),
        )
      } finally {
        setIsSaving(false)
      }
    }, 500),
  ).current

  useEffect(() => {
    return () => {
      setIsSaving(false)
    }
  }, [])

  return { save, isSaving }
}
