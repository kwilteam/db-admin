"use client"

import useIde from "@/hooks/useIde"
import { Editor } from "@monaco-editor/react"
import DeployToolbar from "./DeployToolbar"
import Loading from "@/components/Loading"
import OpenedSchemas from "./OpenedSchemas"
import { useAppSelector } from "@/store/hooks"
import {
  selectActiveSchema,
  selectSchemaContentDict,
  selectSchemas,
} from "@/store/ide"

export default function Ide() {
  const openedSchemas = useAppSelector(selectSchemas)
  const activeSchema = useAppSelector(selectActiveSchema)
  const schemaContentDict = useAppSelector(selectSchemaContentDict)

  const { handleEditorDidMount, save, isLoading, outcome, language, theme } =
    useIde()

  const saveSchema = (value: string | undefined) => {
    console.log("Save Schema", value)
  }

  return (
    <div className="flex max-h-screen min-h-screen w-full flex-row">
      <div className="flex w-full flex-col">
        <div className="h-10">
          <OpenedSchemas />
        </div>
        <div className="flex w-full flex-1">
          {openedSchemas &&
            openedSchemas.length > 0 &&
            schemaContentDict[activeSchema] && (
              <Editor
                defaultLanguage={language}
                path={activeSchema}
                defaultValue={schemaContentDict[activeSchema] ?? undefined}
                theme={theme}
                language={language}
                loading={<Loading />}
                className="m flex-1 rounded-md border-slate-200"
                onMount={handleEditorDidMount}
                onChange={(value) => saveSchema(value)}
              />
            )}
        </div>
        <div className="m-1 ml-2 mt-2 flex h-12 flex-row gap-2">
          {openedSchemas && openedSchemas.length > 0 && (
            <DeployToolbar
              save={save}
              isLoading={isLoading}
              outcome={outcome}
            />
          )}
        </div>
      </div>
    </div>
  )
}
