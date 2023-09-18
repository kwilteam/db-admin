import { KwilTypes } from "@/util/database-types"
import classNames from "classnames"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HashtagIcon,
  TableIcon,
} from "@/util/icons"
import Link from "next/link"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  setDatabaseVisibility,
  selectDatabaseSchemas,
  selectDatabaseVisibility,
} from "@/store/database"

export const DatabaseTables = ({ database }: { database: string }) => {
  const dispatch = useAppDispatch()
  const databaseSchemas = useAppSelector(selectDatabaseSchemas)
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  console.log("databaseSchemas", databaseSchemas)
  console.log("databaseVisibility", databaseVisibility)

  return (
    <>
      <div
        className={classNames({
          "flex cursor-pointer select-none flex-row items-center gap-1 text-sm":
            true,
          "text-slate-500 hover:text-slate-900":
            !databaseVisibility[database]?.tables,
          "text-slate-900": databaseVisibility[database]?.tables,
        })}
        onClick={() =>
          dispatch(
            setDatabaseVisibility({
              database,
              key: "tables",
            }),
          )
        }
      >
        <ChevronDownIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: !databaseVisibility[database]?.tables,
          })}
        />
        <ChevronRightIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: databaseVisibility[database]?.tables,
          })}
        />
        <TableIcon
          className={classNames({
            "h-4 w-4": true,
            "text-kwil-light": databaseVisibility[database]?.tables,
          })}
        />
        Tables
      </div>
      <div className="mb-1">
        {databaseVisibility[database]?.tables &&
          databaseSchemas &&
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
    <div
      key={`${database}-${table.name}`}
      className="ml-10 overflow-hidden text-sm"
    >
      <Link
        href={`/databases/${database}/table/${table.name}`}
        className={classNames({
          "flex select-none flex-row items-center gap-1 hover:text-slate-900":
            true,
          "text-slate-500 hover:text-slate-900": true,
        })}
      >
        <HashtagIcon className="h-3 w-3" />
        <span className="max-w-[80%]">{table.name}</span>
      </Link>
    </div>
  )
}
