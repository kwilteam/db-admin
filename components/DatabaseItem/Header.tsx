import {
  ChevronRightIcon,
  DatabaseIcon,
  TableIcon,
  ActionIcon,
} from "@/utils/icons"
import React from "react"

interface IProps {
  database: string
  type: "table" | "action"
  name: string
}

export default function Header({ database, type, name }: IProps) {
  return (
    <div className="max-w-screen lg:text-md flex select-none flex-row items-center gap-2 border-b border-slate-200 bg-slate-50 p-2 text-sm">
      <DatabaseIcon className="h-4 w-4" />
      <span>{database}</span>
      <ChevronRightIcon className="h-4 w-4" />
      {type === "table" && <TableIcon className="h-4 w-4" />}
      {type === "action" && <ActionIcon className="h-4 w-4" />}
      <div className="overflow-none">{name}</div>
    </div>
  )
}
