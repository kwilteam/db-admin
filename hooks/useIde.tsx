import { useRef, useState } from "react"
import * as monaco from "monaco-editor"
import { kfLanguage, customTheme } from "@/lib/kfLanguage"
import { deployDatabase } from "@/utils/api"
import { Monaco } from "@monaco-editor/react"

// https://www.npmjs.com/package/@monaco-editor/react#multi-model-editor

export interface IDeployOutcome {
  status: "error" | "success" | undefined
  message: string | undefined
}

export default function useIde() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()
  const [isLoading, setIsLoading] = useState(false)
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

  const save = async () => {
    if (!editorRef.current) return

    setIsLoading(true)
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
    setIsLoading(false)
  }

  return { handleEditorDidMount, save, isLoading, outcome, language, theme }
}
