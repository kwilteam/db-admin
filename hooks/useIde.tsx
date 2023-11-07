import { useRef, useState } from "react"
import * as monaco from "monaco-editor"
import { Monaco } from "@monaco-editor/react"
import { kfLanguage, customTheme } from "@/lib/kfLanguage"
import { deployDatabase, saveSchemaContent } from "@/utils/api"
import { useAppDispatch } from "@/store/hooks"
import { addDatabase } from "@/store/database"
export interface IDeployOutcome {
  status: "error" | "success" | undefined
  message: string | undefined
}

export default function useIde() {
  const dispatch = useAppDispatch()
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()
  const [isDeploying, setIsDeploying] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [outcome, setOutcome] = useState<IDeployOutcome | undefined>()
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
    setOutcome(undefined)
    const code = editorRef.current.getValue()
    try {
      const result = await deployDatabase(code)
      const dbName = getDbName(code)

      if (result && result.outcome === "success") {
        setOutcome({
          status: "success",
          message: "Database deployed successfully!",
        })
        if (dbName) {
          dispatch(addDatabase(dbName))
        }
      } else if (result && result.outcome === "error") {
        setOutcome({
          status: "error",
          message: result.data as string,
        })
      }

      console.log(result, "result")
    } catch (e) {
      console.error(e)
      setOutcome({
        status: "error",
        message: "Something went wrong!",
      })
    }

    setTimeout(() => setOutcome(undefined), 5000)
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
        if (!content) return

        setIsSaving(true)

        await saveSchemaContent(name, content)

        setTimeout(() => setIsSaving(false), 500)
      } catch (error) {
        console.error("Auto-save failed", error)
      }
    }, 1000),
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
    outcome,
    language,
    theme,
  }
}
