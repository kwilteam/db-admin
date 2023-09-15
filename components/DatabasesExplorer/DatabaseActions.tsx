import { DatabaseDictionary } from "@/util/types"
import { Types as KwilTypes } from "kwil"
import { IDisplayToggle } from "."
import classNames from "classnames"
import {
  ActionIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HashtagIcon,
} from "@/util/icons"
import Link from "next/link"

export const DatabaseActions = ({
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
            !displayToggle[database]?.actions,
          "text-slate-900": displayToggle[database]?.actions,
        })}
        onClick={() => toggleDisplay(database, "actions")}
      >
        <ChevronDownIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: !displayToggle[database]?.actions,
          })}
        />
        <ChevronRightIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: displayToggle[database]?.actions,
          })}
        />
        <ActionIcon
          className={classNames({
            "h-4 w-4": true,
            "text-kwil-light": displayToggle[database]?.actions,
          })}
        />
        Actions
      </div>
      {displayToggle[database]?.actions &&
        databaseSchemas[database]?.actions?.map(
          (action: KwilTypes.ActionSchema, index: number) => (
            <DatabaseActionLink
              key={index}
              database={database}
              action={action}
            />
          ),
        )}
    </>
  )
}

const DatabaseActionLink = ({
  database,
  action,
}: {
  database: string
  action: KwilTypes.ActionSchema
}) => {
  return (
    <div key={`${database}-${action.name}`} className="ml-5 text-sm">
      <Link
        href={`/databases/${database}/action/${action.name}`}
        className={classNames({
          "flex select-none flex-row items-center gap-1 hover:text-slate-900":
            true,
          "text-slate-500 hover:text-slate-900": true,
        })}
      >
        <HashtagIcon className="h-3 w-3" />
        {action.name}
      </Link>
    </div>
  )
}
