import { useRef, useState } from "react"
import * as monaco from "monaco-editor"
import { kfLanguage, customTheme } from "@/lib/kfLanguage"
import { deployDatabase, saveSchemaContent } from "@/utils/api"
import { Monaco } from "@monaco-editor/react"
export interface IDeployOutcome {
  status: "error" | "success" | undefined
  message: string | undefined
}

export default function useIde() {
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

      if (result && result.status === 400) {
        setOutcome({
          status: "error",
          message: result.data as string,
        })
      } else if (result && result.status === 200) {
        setOutcome({
          status: "success",
          message: "Database deployed successfully!",
        })
      }

      setTimeout(() => setOutcome(undefined), 5000)

      console.log(result, "result")
    } catch (e) {
      console.error(e)
    }
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
