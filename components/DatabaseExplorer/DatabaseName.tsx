import classNames from "classnames"
import { ChevronDownIcon, ChevronRightIcon, DatabaseIcon } from "@/util/icons"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  selectDatabaseVisibility,
  setDatabaseVisibility,
} from "@/store/database"
import useGetDbStructure from "@/hooks/useGetDatabaseStructure"

const DatabaseName = ({ database }: { database: string }) => {
  const { getDbStructure } = useGetDbStructure()
  const dispatch = useAppDispatch()
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  const isVisible = databaseVisibility[database]?.isVisible

  const getSchemaOrHide = (database: string) => {
    if (isVisible) {
      dispatch(
        setDatabaseVisibility({
          database,
          key: "isVisible",
          isVisible: false,
        }),
      )
    } else {
      getDbStructure(database)
    }
  }

  return (
    <li
      id={`${database}-item`}
      key={database}
      className={classNames({
        "text-md flex cursor-pointer select-none flex-row items-center gap-1 p-2 pb-1":
          true,
        "text-slate-500 hover:text-slate-900": !isVisible,
        "text-slate-900": isVisible,
      })}
      onClick={() => getSchemaOrHide(database)}
    >
      <ChevronDownIcon
        className={classNames({
          "h-4 w-4": true,
          hidden: !isVisible,
        })}
      />
      <ChevronRightIcon
        className={classNames({
          "h-4 w-4": true,
          hidden: isVisible,
        })}
      />
      <DatabaseIcon
        className={classNames({
          "h-4 w-4": true,
          "text-amber-500": isVisible,
        })}
      />
      <span>{database}</span>
    </li>
  )
}

export default DatabaseName