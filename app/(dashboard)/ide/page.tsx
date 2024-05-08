"use client"

import { useEffect } from "react"
import classNames from "classnames"
import { Editor } from "@monaco-editor/react"
import useCompileDatabase from "@/hooks/ide/use-compile-database"
import useEditorMount from "@/hooks/ide/use-editor-mount"
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
import useEditorHandlers from "@/hooks/ide/use-editor-handlers"
import { useWindowSize } from "@/hooks/use-window-size"

const language = "kuneiformLang"
const theme = "kuneiformTheme"

export default function IdePage() {
  const openedSchemas = useAppSelector(selectOpenSchemas)
  const activeSchema = useAppSelector(selectActiveSchema)
  const schemaContentDict = useAppSelector(selectSchemaContentDict)
  const { handleEditorDidMount, editorRef, monacoInstance, autoCompleteRef } = useEditorMount()
  const { deploy, exportJson, isCompiling, parseKuneiform } = useCompileDatabase(editorRef)
  const { save, isSaving } = useSaveSchema()
  const { handleEditorFeatures } = useEditorHandlers(parseKuneiform);

  // When the active schema changes, focus the editor
  // Helpful when creating a new schema
  useEffect(() => {
    if (editorRef.current) {
      setTimeout(() => {
        editorRef.current?.focus() // Focus the editor
      }, 500)
    }
  }, [activeSchema, editorRef, schemaContentDict])

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
                await handleEditorFeatures(value, editorRef, monacoInstance, autoCompleteRef)
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
          <ActionPanel deploy={deploy} exportJson={exportJson} isLoading={isCompiling || isSaving} />
        </div>
      )}
    </div>
  )
}
