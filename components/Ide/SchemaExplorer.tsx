"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import classNames from "classnames"
import useCreateNewSchema from "@/hooks/useCreateNewSchema"
import { FileCreateIcon, FileIcon } from "@/utils/icons"
import { selectSavedSchemas, loadSavedSchemas } from "@/store/ide"
import Loading from "../Loading"
import SchemaItem from "./SchemaItem"

export default function SchemaExplorer() {
  const dispatch = useAppDispatch()
  const savedSchemas = useAppSelector(selectSavedSchemas)

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
          {!savedSchemas && <Loading className="flex w-full justify-center" />}
          {savedSchemas &&
            savedSchemas.map((schema) => (
              <SchemaItem key={schema} schema={schema} />
            ))}
          {isCreatingNewSchema && (
            <li className="flex h-10 cursor-pointer select-none flex-row items-center gap-1 p-2 pl-4 pr-2 text-xs hover:bg-slate-50">
              <FileIcon className="h-4 w-4" />
              <input
                ref={newSchemaInputRef}
                value={newSchemaName ?? ""}
                className={classNames({
                  "w-full rounded-md p-1 outline-none hover:bg-slate-50": true,
                  "border border-red-400":
                    savedSchemas && savedSchemas.includes(newSchemaName ?? ""),
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
