import classNames from "classnames"
import { IDisplayToggle } from "."
import { ChevronDownIcon, ChevronRightIcon, DatabaseIcon } from "@/util/icons"

export const DatabaseItem = ({
  database,
  displayToggle,
  getSchema,
}: {
  database: string
  displayToggle: IDisplayToggle
  getSchema: (database: string) => void
}) => {
  return (
    <li
      key={database}
      className={classNames({
        "text-md flex cursor-pointer select-none flex-row items-center gap-1 p-2 pb-1":
          true,
        "text-slate-500 hover:text-slate-900": !displayToggle[database]?.schema,
        "text-slate-900": displayToggle[database]?.schema,
      })}
      onClick={() => getSchema(database)}
    >
      <ChevronDownIcon
        className={classNames({
          "h-4 w-4": true,
          hidden: !displayToggle[database]?.schema,
        })}
      />
      <ChevronRightIcon
        className={classNames({
          "h-4 w-4": true,
          hidden: displayToggle[database]?.schema,
        })}
      />
      <DatabaseIcon
        className={classNames({
          "h-4 w-4": true,
          "text-amber-500": displayToggle[database]?.schema,
        })}
      />
      {database}
    </li>
  )
}
