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
  selectOpenSchemas,
} from "@/store/ide"
import classNames from "classnames"

export default function Ide() {
  const openedSchemas = useAppSelector(selectOpenSchemas)
  const activeSchema = useAppSelector(selectActiveSchema)
  const schemaContentDict = useAppSelector(selectSchemaContentDict)

  const {
    handleEditorDidMount,
    save,
    deploy,
    isDeploying,
    isSaving,
    outcome,
    language,
    theme,
  } = useIde()

  return (
    <div className="flex max-h-screen min-h-screen w-full flex-row">
      <div className="flex w-full flex-col">
        <div className="lg:h-10">
          <OpenedSchemas />
        </div>
        <div
          className={classNames({
            "flex w-full flex-1": true,
            "bg-slate-50": openedSchemas && openedSchemas.length > 0, // Ensures no flash of white when first schema opened
          })}
        >
          {openedSchemas &&
            openedSchemas.length > 0 &&
            Object.hasOwn(schemaContentDict, activeSchema) && (
              <Editor
                defaultLanguage={language}
                path={activeSchema}
                defaultValue={schemaContentDict[activeSchema] ?? ""}
                theme={theme}
                language={language}
                loading={<Loading />}
                className="m flex-1 rounded-md border-slate-200"
                onMount={handleEditorDidMount}
                onChange={(value) => save(activeSchema, value)}
              />
            )}
        </div>
        <div className="m-1 ml-2 mt-2 flex h-8 flex-row gap-2">
          {openedSchemas && openedSchemas.length > 0 && (
            <DeployToolbar
              deploy={deploy}
              isLoading={isDeploying || isSaving}
              outcome={outcome}
            />
          )}
        </div>
      </div>
    </div>
  )
}
