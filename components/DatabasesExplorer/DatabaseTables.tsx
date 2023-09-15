import { DatabaseDictionary } from "@/util/types"
import { Types as KwilTypes } from "kwil"
import { IDisplayToggle } from "."
import classNames from "classnames"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HashtagIcon,
  TableIcon,
} from "@/util/icons"
import Link from "next/link"

export const DatabaseTables = ({
  database,
  displayToggle,
  databaseSchemas,
  toggleDisplay,
}: {
  database: string
  displayToggle: IDisplayToggle
  databaseSchemas: DatabaseDictionary
  toggleDisplay: (
    database: string,
    display: keyof IDisplayToggle[string],
  ) => void
}) => {
  return (
    <>
      <div
        className={classNames({
          "flex cursor-pointer select-none flex-row items-center gap-1 text-sm":
            true,
          "text-slate-500 hover:text-slate-900":
            !displayToggle[database]?.tables,
          "text-slate-900": displayToggle[database]?.tables,
        })}
        onClick={() => toggleDisplay(database, "tables")}
      >
        <ChevronDownIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: !displayToggle[database]?.tables,
          })}
        />
        <ChevronRightIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: displayToggle[database]?.tables,
          })}
        />
        <TableIcon
          className={classNames({
            "h-4 w-4": true,
            "text-kwil-light": displayToggle[database]?.tables,
          })}
        />
        Tables
      </div>
      <div className="mb-1">
        {displayToggle[database]?.tables &&
          databaseSchemas[database]?.tables?.map(
            (table: KwilTypes.Table<string>, index: number) => (
              <DatabaseTableLink
                key={index}
                database={database}
                table={table}
              />
            ),
          )}
      </div>
    </>
  )
}

const DatabaseTableLink = ({
  database,
  table,
}: {
  database: string
  table: KwilTypes.Table<string>
}) => {
  return (
    <div key={`${database}-${table.name}`} className="ml-5 text-sm">
      <Link
        href={`/databases/${database}/table/${table.name}`}
        className={classNames({
          "flex select-none flex-row items-center gap-1 hover:text-slate-900":
            true,
          "text-slate-500 hover:text-slate-900": true,
        })}
      >
        <HashtagIcon className="h-3 w-3" />
        {table.name}
      </Link>
    </div>
  )
}
