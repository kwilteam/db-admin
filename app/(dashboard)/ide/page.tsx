"use client"

import { useEffect } from "react"
import classNames from "classnames"
import { Editor } from "@monaco-editor/react"
import useCompileDatabase from "@/hooks/ide/use-compile-database"
import useSaveSchema from "@/hooks/ide/use-save-schema"
import { useAppSelector } from "@/store/hooks"
import {
  selectActiveSchema,
  selectSchemaContentDict,
  selectOpenSchemas,
} from "@/store/ide"
import ActionPanel from "@/components/Ide/ActionPanel"
import Loading from "@/components/Loading"
import OpenedSchemas from "@/components/Ide/OpenedSchemas"
import { useWindowSize } from "@/hooks/use-window-size"
import { useTriggerProviderStatus } from "@/hooks/use-trigger-provider-status-check"
import useEditorMount from "@/hooks/ide/use-editor-mount"

const language = "sql"
const theme = "sql"

export default function IdePage() {
  const openedSchemas = useAppSelector(selectOpenSchemas)
  const activeSchema = useAppSelector(selectActiveSchema)
  const schemaContentDict = useAppSelector(selectSchemaContentDict)
  const { handleEditorDidMount, editorRef } = useEditorMount()
  const { deploy, exportSql, isCompiling } = useCompileDatabase(editorRef)
  const { save, isSaving } = useSaveSchema()
  // const { handleEditorFeatures } = useEditorHandlers(parseKuneiform);
  const windowSize = useWindowSize();

  // When the active schema changes, focus the editor
  // Helpful when creating a new schema
  useEffect(() => {
    if (editorRef.current) {
      setTimeout(() => {
        editorRef.current?.focus() // Focus the editor
      }, 500)
    }
  }, [activeSchema, editorRef, schemaContentDict])

  // Ping Provider Status
  useTriggerProviderStatus({ delay: 500 })

  return (
    <div className="flex max-h-screen min-h-screen w-full flex-col">
      <div className="flex w-full flex-col lg:h-10">
        <OpenedSchemas />
      </div>

      <div
        className={classNames({
          "flex h-full w-full flex-1": true,
          "bg-slate-50": openedSchemas && openedSchemas.length > 0, // Ensures no flash of white when first schema opened
        })}
      >
        {openedSchemas &&
          openedSchemas.length > 0 && (
            <Editor
              defaultLanguage={language}
              path={activeSchema}
              defaultValue={schemaContentDict[activeSchema] ?? ""}
              theme={theme}
              language={language}
              loading={<Loading className="mt-4" />}
              className="min-h-screen rounded-md border-slate-200 bg-black"
              onMount={handleEditorDidMount}
              onChange={async (value) => {
                save(activeSchema, value)
              }}
              options={{
                autoClosingBrackets: "always",
                autoIndent: "brackets",
                autoClosingQuotes: "always",
                autoSurround: "languageDefined",
                tabSize: 2,
              }}
            />
          )}
      </div>
      {openedSchemas && openedSchemas.length > 0 && (
        <div
          className={classNames({
            "fixed bottom-0 flex h-12 w-full items-center border-t border-slate-200 bg-white px-3": true,
            "py-7": windowSize === "lg"
          })}
        >
          <ActionPanel deploy={deploy} exportSql={exportSql} isLoading={isCompiling || isSaving} />
        </div>
      )}
    </div>
  )
}
