import classNames from "classnames"

import { ChevronDownIcon, ChevronRightIcon, DatabaseIcon } from "@/util/icons"
import { KwilTypes } from "@/util/database-types"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  setDatabaseSchema,
  setDatabaseVisibility,
  selectDatabaseSchemas,
  selectDatabaseVisibility,
} from "@/store/database"
import { getDatabaseSchema } from "@/util/api"

export const DatabaseItem = ({ database }: { database: string }) => {
  const dispatch = useAppDispatch()
  const databaseSchemas = useAppSelector(selectDatabaseSchemas)
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  const getSchema = async (database: string) => {
    console.log(databaseSchemas)
    if (databaseSchemas && databaseSchemas[database]) {
      dispatch(
        setDatabaseVisibility({
          database,
          key: "isVisible",
        }),
      ) // Toggles the visibility of the database
      dispatch(
        setDatabaseVisibility({
          database,
          key: "tables",
          isVisible: false,
        }),
      )
      dispatch(
        setDatabaseVisibility({
          database,
          key: "actions",
          isVisible: false,
        }),
      )
    } else {
      const schema: KwilTypes.Database<string> | undefined =
        await getDatabaseSchema(database)
      if (!schema) return

      dispatch(
        setDatabaseSchema({
          database,
          schema,
        }),
      )

      dispatch(
        setDatabaseVisibility({
          database,
          key: "isVisible",
          isVisible: true,
        }),
      )
    }
  }

  return (
    <li
      id={`${database}-item`}
      key={database}
      className={classNames({
        "text-md flex cursor-pointer select-none flex-row items-center gap-1 p-2 pb-1":
          true,
        "text-slate-500 hover:text-slate-900":
          !databaseVisibility[database]?.isVisible,
        "text-slate-900": databaseVisibility[database]?.isVisible,
      })}
      onClick={() => getSchema(database)}
    >
      <ChevronDownIcon
        className={classNames({
          "h-4 w-4": true,
          hidden: !databaseVisibility[database]?.isVisible,
        })}
      />
      <ChevronRightIcon
        className={classNames({
          "h-4 w-4": true,
          hidden: databaseVisibility[database]?.isVisible,
        })}
      />
      <DatabaseIcon
        className={classNames({
          "h-4 w-4": true,
          "text-amber-500": databaseVisibility[database]?.isVisible,
        })}
      />
      {database}
    </li>
  )
}
