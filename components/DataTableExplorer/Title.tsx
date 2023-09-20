import {
  ChevronRightIcon,
  DatabaseIcon,
  TableIcon,
  ActionIcon,
} from "@/util/icons"
import React from "react"

interface IProps {
  database: string
  type: "table" | "action"
  name: string
}

export default function Title({ database, type, name }: IProps) {
  return (
    <div className="flex select-none flex-row items-center gap-2 border-b border-slate-200 bg-slate-50 p-2">
      <DatabaseIcon className="h-4 w-4" />
      <span>{database}</span>
      <ChevronRightIcon className="h-4 w-4" />
      {type === "table" && <TableIcon className="h-4 w-4" />}
      {type === "action" && <ActionIcon className="h-4 w-4" />}
      <span>{name}</span>
    </div>
  )
}
