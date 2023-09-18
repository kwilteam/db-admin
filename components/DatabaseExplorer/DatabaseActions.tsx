import { KwilTypes } from "@/util/database-types"

import classNames from "classnames"
import {
  ActionIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HashtagIcon,
} from "@/util/icons"
import Link from "next/link"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  setDatabaseVisibility,
  selectDatabaseSchemas,
  selectDatabaseVisibility,
} from "@/store/database"

export const DatabaseActions = ({ database }: { database: string }) => {
  const dispatch = useAppDispatch()
  const databaseSchemas = useAppSelector(selectDatabaseSchemas)
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)
  return (
    <>
      <div
        className={classNames({
          "flex cursor-pointer select-none flex-row items-center gap-1 text-sm":
            true,
          "text-slate-500 hover:text-slate-900":
            !databaseVisibility[database]?.actions,
          "text-slate-900": databaseVisibility[database]?.actions,
        })}
        onClick={() =>
          dispatch(
            setDatabaseVisibility({
              database,
              key: "actions",
            }),
          )
        }
      >
        <ChevronDownIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: !databaseVisibility[database]?.actions,
          })}
        />
        <ChevronRightIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: databaseVisibility[database]?.actions,
          })}
        />
        <ActionIcon
          className={classNames({
            "h-4 w-4": true,
            "text-kwil-light": databaseVisibility[database]?.actions,
          })}
        />
        Actions
      </div>
      {databaseVisibility[database]?.actions &&
        databaseSchemas &&
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
    <div key={`${database}-${action.name}`} className="ml-10 text-sm">
      <Link
        href={`/databases/${database}/action/${action.name}`}
        className={classNames({
          "flex select-none flex-row items-center gap-1 hover:text-slate-900":
            true,
          "text-slate-500 hover:text-slate-900": true,
        })}
      >
        <HashtagIcon className="h-3 w-3" />
        <span className="max-w-[80%]">{action.name}</span>
      </Link>
    </div>
  )
}
