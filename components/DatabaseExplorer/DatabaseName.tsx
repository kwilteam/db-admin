import classNames from "classnames"
import { ChevronDownIcon, ChevronRightIcon, DatabaseIcon } from "@/utils/icons"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  selectDatabaseVisibility,
  setDatabaseVisibility,
} from "@/store/database"
import useGetDbStructure from "@/hooks/useGetDatabaseStructure"
import useDeleteDb from "@/hooks/useDeleteDb"

const DatabaseName = ({ database }: { database: string }) => {
  const { getDbStructure } = useGetDbStructure()
  const dispatch = useAppDispatch()
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)
  const triggerDeleteDb = useDeleteDb()

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
      test-id={`database-item-${database}`}
      // id={`${database}-item`}
      key={database}
      className={classNames({
        "group ml-2 flex cursor-pointer select-none flex-row items-center gap-1 p-1 text-sm":
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
      <span
        className="invisible ml-auto mr-2 text-slate-400 hover:text-slate-700 group-hover:visible"
        onClick={(e) => triggerDeleteDb(e, database)}
        test-id={`database-item-${database}-delete`}
      >
        x
      </span>
    </li>
  )
}

export default DatabaseName
