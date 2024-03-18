import { useRef } from "react"
import * as monaco from "monaco-editor"
import { Monaco } from "@monaco-editor/react"
import { kfLanguage, customTheme } from "@/lib/kfLanguage"

export default function useEditorMount() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | undefined>(
    undefined,
  )

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: Monaco,
  ) => {
    editorRef.current = editor

    monacoInstance.languages.register({ id: "kuneiformLang" })

    monacoInstance.languages.setMonarchTokensProvider(
      "kuneiformLang",
      kfLanguage as monaco.languages.IMonarchLanguage,
    )

    monacoInstance.editor.defineTheme(
      "kuneiformTheme",
      customTheme as monaco.editor.IStandaloneThemeData,
    )

    monacoInstance.editor.setTheme("kuneiformTheme")
  }

  return { handleEditorDidMount, editorRef }
}
