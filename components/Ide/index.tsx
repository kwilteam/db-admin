"use client"

import useIde from "@/hooks/useIde"
import { Editor } from "@monaco-editor/react"
import DeployToolbar from "./DeployToolbar"
import Loading from "@/components/Loading"
import FileExplorer from "./FileExplorer"

interface IIdeProps {
  templates: string[]
  savedFiles: string[]
}

export default function Ide({ templates, savedFiles }: IIdeProps) {
  const { handleEditorDidMount, save, isLoading, outcome, language, theme } =
    useIde()

  return (
    <div className="flex max-h-screen min-h-screen w-full flex-row">
      <div className="flex w-full flex-col">
        <div className="m-1 gap-2">Open Files tabs</div>
        <div className=" flex w-full flex-1">
          <Editor
            defaultLanguage={language}
            defaultValue="database hello_world;"
            theme={theme}
            language={language}
            loading={<Loading />}
            className="mx-2 flex-1 rounded-md border-2 border-slate-200"
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="m-1 gap-2">
          <DeployToolbar save={save} isLoading={isLoading} outcome={outcome} />
        </div>
      </div>

      <div className="m-1 mt-0 flex h-full w-64">
        <FileExplorer templates={templates} savedFiles={savedFiles} />
      </div>
    </div>
  )
}
