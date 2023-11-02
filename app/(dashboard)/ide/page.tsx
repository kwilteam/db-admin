"use client"

import useIde from "@/hooks/useIde"
import { Editor } from "@monaco-editor/react"
import classNames from "classnames"
import { useAppSelector } from "@/store/hooks"
import {
  selectActiveSchema,
  selectSchemaContentDict,
  selectOpenSchemas,
} from "@/utils/kwil/ide"
import ActionPanel from "@/components/Ide/ActionPanel"
import Loading from "@/components/Loading"
import OpenedSchemas from "@/components/Ide/OpenedSchemas"
import Alert from "@/components/Alert"

export default function IdePage() {
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
    <div className="flex max-h-screen min-h-screen w-full flex-col">
      <div className="flex w-full flex-col lg:h-10">
        <OpenedSchemas />
      </div>
      {/* Mobile alert */}
      {outcome?.status && outcome.message && (
        <Alert
          type={outcome.status}
          text={outcome.message}
          className="absolute top-32 z-30 block h-auto w-full lg:hidden"
        />
      )}
      <div
        className={classNames({
          "flex h-full w-full flex-1": true,
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
              loading={<Loading className="mt-4" />}
              className="min-h-screen rounded-md border-slate-200 bg-black"
              onMount={handleEditorDidMount}
              onChange={(value) => save(activeSchema, value)}
            />
          )}
      </div>
      {openedSchemas && openedSchemas.length > 0 && (
        <div className="fixed bottom-0 z-20 flex h-12 w-full items-center border-t border-slate-200 bg-white p-3">
          <ActionPanel
            deploy={deploy}
            isLoading={isDeploying || isSaving}
            outcome={outcome}
          />
        </div>
      )}
    </div>
  )
}
