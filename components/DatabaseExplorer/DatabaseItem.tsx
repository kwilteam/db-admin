import classNames from "classnames"
import { ChevronDownIcon, ChevronRightIcon, DatabaseIcon } from "@/util/icons"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  selectDatabaseVisibility,
  setDatabaseVisibility,
} from "@/store/database"
import useGetSchema from "@/hooks/useGetSchema"

export const DatabaseItem = ({ database }: { database: string }) => {
  const { getSchema } = useGetSchema()
  const dispatch = useAppDispatch()
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  const getSchemaOrHide = (database: string) => {
    if (databaseVisibility[database]?.isVisible) {
      dispatch(
        setDatabaseVisibility({
          database,
          key: "isVisible",
          isVisible: false,
        }),
      )
    } else {
      getSchema(database)
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
      onClick={() => getSchemaOrHide(database)}
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
