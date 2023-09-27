"use client"

import Editor, { Monaco } from "@monaco-editor/react"
import { useRef, useEffect } from "react"
import * as monaco from "monaco-editor"
import { kfLanguage, customTheme } from "@/lib/kfLanguage"

export default function CreatePage() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()

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

  return (
    <div className="flex min-h-screen flex-col p-2">
      <Editor
        defaultLanguage="kuneiformLang"
        defaultValue="database hello_world;"
        theme="kuneiformTheme"
        language="kuneiformLang"
        className="h-full w-full rounded-md border-2 border-slate-200"
        onChange={(value) => console.log(value)}
        onMount={handleEditorDidMount}
      />
      <div className="flex flex-col gap-2">
        <button className="w-10">Run</button>
      </div>
    </div>
  )
}
