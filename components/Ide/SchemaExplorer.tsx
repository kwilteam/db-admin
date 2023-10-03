"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  loadSchema,
  openSchema,
  selectSavedSchemas,
  loadSavedSchemas,
  removeSchema,
} from "@/store/ide"
import { FileCreateIcon, FileIcon, XIcon } from "@/utils/icons"
import useCreateNewSchema from "@/hooks/useCreateNewSchema"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { deleteSchema } from "@/utils/api"

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

  const triggerOpenSchema = (schema: string) => {
    dispatch(loadSchema(schema))
    dispatch(openSchema(schema))
  }

  const triggerDeleteSchema = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    schema: string,
  ) => {
    e.stopPropagation() // To prevent triggering openSchema

    const c = confirm(`Are you sure you want to delete ${schema}.kf?`)

    if (c) {
      console.log("delete schema", schema)
      // API call to delete schema
      const deleted = await deleteSchema(schema)

      if (deleted) {
        dispatch(removeSchema(schema))
      }
    }
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
                className="group flex h-10 cursor-pointer select-none items-center gap-1 p-2 text-xs hover:bg-slate-50"
                onClick={() => triggerOpenSchema(schema)}
              >
                <FileIcon className="h-4 w-4" />
                <span className="w-full">{schema}.kf</span>
                <span
                  className="invisible ml-auto p-2 text-slate-400 hover:text-slate-700 group-hover:visible"
                  onClick={(e) => triggerDeleteSchema(e, schema)}
                >
                  x
                </span>
              </li>
            ))}
          {isCreatingNewSchema && (
            <li className="flex h-10 cursor-pointer select-none flex-row items-center gap-1 p-2 px-2 text-xs hover:bg-slate-50">
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
