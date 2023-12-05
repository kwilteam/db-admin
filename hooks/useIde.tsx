import { useRef, useState } from "react"
import * as monaco from "monaco-editor"
import { Monaco } from "@monaco-editor/react"
import { kfLanguage, customTheme } from "@/lib/kfLanguage"
import { deployDatabase, saveSchemaContent } from "@/utils/api"
import { useAppDispatch } from "@/store/hooks"
import { addDatabase } from "@/store/database"
import { setSchemaContent } from "@/store/ide"
import { setAlert } from "@/store/global"

export default function useIde() {
  const dispatch = useAppDispatch()
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()
  const [isDeploying, setIsDeploying] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const language = "kuneiformLang"
  const theme = "kuneiformTheme"

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: Monaco,
  ) => {
    editorRef.current = editor

    monacoInstance.languages.register({ id: "kuneiformLang" })

    // Define a simple schema for the language
    monacoInstance.languages.setMonarchTokensProvider(
      "kuneiformLang",
      kfLanguage as monaco.languages.IMonarchLanguage,
    )

    // Define your custom theme
    monacoInstance.editor.defineTheme(
      "kuneiformTheme",
      customTheme as monaco.editor.IStandaloneThemeData,
    )

    // Set the custom theme
    monacoInstance.editor.setTheme("kuneiformTheme")
  }

  const deploy = async () => {
    if (!editorRef.current) return

    setIsDeploying(true)

    const code = editorRef.current.getValue()
    try {
      const result = await deployDatabase(code)
      const dbName = getDbName(code)

      if (result && result.outcome === "success") {
        dispatch(
          setAlert({
            type: "success",
            text: "Database deployed successfully!",
            position: "top",
          }),
        )
        if (dbName) {
          dispatch(addDatabase(dbName))
        }
      } else if (result && result.outcome === "error") {
        dispatch(
          setAlert({
            type: "error",
            text: result.data as string,
            position: "top",
          }),
        )
      }

      console.log(result, "result")
    } catch (e) {
      console.error(e)

      dispatch(
        setAlert({
          type: "error",
          text: "The database could not be deployed.",
          position: "top",
        }),
      )
    }

    setTimeout(() => dispatch(setAlert(undefined)), 3000)
    setIsDeploying(false)
  }

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const save = useRef(
    debounce(async (name: string, content: string) => {
      try {
        dispatch(
          setSchemaContent({
            name,
            content,
          }),
        )

        console.log("set schema content", name, content)

        setIsSaving(true)

        await saveSchemaContent(name, content)

        setTimeout(() => setIsSaving(false), 500)
      } catch (error) {
        console.error("Auto-save failed", error)
      }
    }, 500),
  ).current

  const getDbName = (code: string) => {
    const dbNameMatch = code.match(/database\s+(\w+);/)
    return dbNameMatch ? dbNameMatch[1] : undefined
  }

  return {
    handleEditorDidMount,
    save,
    deploy,
    isDeploying,
    isSaving,
    language,
    theme,
  }
}
