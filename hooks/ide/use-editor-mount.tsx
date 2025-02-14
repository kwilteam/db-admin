import { useRef } from "react"
import * as monaco from "monaco-editor"

export default function useEditorMount() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | undefined>(
    undefined,
  )

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor
  }

  return { handleEditorDidMount, editorRef }
}
