"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  loadSchema,
  openSchema,
  selectSavedSchemas,
  loadSavedSchemas,
} from "@/store/ide"
import { FileCreateIcon, FileIcon } from "@/utils/icons"
import useCreateNewSchema from "@/hooks/useCreateNewSchema"
import classNames from "classnames"
import { useEffect, useState } from "react"

export default function SchemaExplorer() {
  const dispatch = useAppDispatch()
  const savedSchemas = useAppSelector(selectSavedSchemas)
  // const [isLoadingSchemas, setIsLoadingSchemas] = useState(false)

  useEffect(() => {
    dispatch(loadSavedSchemas())
  }, [dispatch])

  const {
    newSchemaName,
    newSchemaNameChange,
    newSchemaNameSubmit,
    newSchemaNameBlur,
    newSchemaInputRef,
    isCreatingNewSchema,
    setIsCreatingNewSchema,
  } = useCreateNewSchema()

  const triggerOpenSchema = (schema: string) => {
    dispatch(loadSchema(schema))
    dispatch(openSchema(schema))
  }

  return (
    <div className="w-full bg-white">
      <div className="flex h-10 items-center bg-slate-50 pl-2 text-sm">
        Schemas{" "}
        <FileCreateIcon
          className="m-auto mr-2 h-5 w-5 cursor-pointer"
          onClick={() => setIsCreatingNewSchema(true)}
        />
      </div>
      <div className="mt-2">
        <ul className="list-none">
          {savedSchemas &&
            savedSchemas.map((schema) => (
              <li
                key={schema}
                className="ml-1 flex cursor-pointer select-none items-center rounded-md p-2 text-xs hover:bg-slate-50"
                onClick={() => triggerOpenSchema(schema)}
              >
                <FileIcon className="mr-1 h-4 w-4" />
                {schema}.kf
              </li>
            ))}
          {isCreatingNewSchema && (
            <li className="ml-1 flex cursor-pointer select-none flex-row items-center gap-1 rounded-md p-0 px-2 text-xs hover:bg-slate-50">
              <FileIcon className="h-4 w-4" />
              <input
                ref={newSchemaInputRef}
                value={newSchemaName ?? ""}
                className={classNames({
                  "w-full rounded-md p-1 outline-none hover:bg-slate-50": true,
                  "border border-red-400": savedSchemas.includes(
                    newSchemaName ?? "",
                  ),
                })}
                type="text"
                onChange={newSchemaNameChange}
                onKeyDown={newSchemaNameSubmit}
                onBlur={newSchemaNameBlur}
              />
              .kf
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
