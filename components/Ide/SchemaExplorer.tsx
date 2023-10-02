"use client"

import { useAppDispatch } from "@/store/hooks"
import { loadSchema, openSchema } from "@/store/ide"
import { FileIcon } from "@/utils/icons"

interface ISchemaExplorerProps {
  savedSchemas: string[]
}

export default function SchemaExplorer({ savedSchemas }: ISchemaExplorerProps) {
  const dispatch = useAppDispatch()
  const triggerOpenSchema = (schema: string) => {
    dispatch(loadSchema(schema))
    dispatch(openSchema(schema))
  }

  return (
    <div className="w-full bg-white">
      <div className="flex h-10 items-center bg-slate-50 pl-2 text-sm">
        Schemas
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
        </ul>
      </div>
    </div>
  )
}
