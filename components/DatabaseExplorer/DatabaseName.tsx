import classNames from "classnames"
import { ChevronDownIcon, ChevronRightIcon, DatabaseIcon } from "@/utils/icons"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  selectDatabaseVisibility,
  setDatabaseVisibility,
} from "@/store/database"
import { IDatasetInfoWithoutOwner } from "@/utils/database-types"
import useDatabaseSchema from "@/hooks/database/useDatabaseSchema"
import useDeleteDb from "@/hooks/database/useDeleteDb"

const DatabaseName = ({ database }: { database: IDatasetInfoWithoutOwner }) => {
  const { getSchema } = useDatabaseSchema()
  const dispatch = useAppDispatch()
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)
  const triggerDeleteDb = useDeleteDb(database)

  const isVisible = databaseVisibility[database.name]?.isVisible

  const getSchemaOrHide = (database: IDatasetInfoWithoutOwner) => {
    if (isVisible) {
      dispatch(
        setDatabaseVisibility({
          database: database.name,
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
      test-id={`database-item-${database.dbid}`}
      key={database.dbid}
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
      <span>{database.name}</span>
      <span
        className="visible ml-auto px-2 text-slate-400 hover:text-slate-700 group-hover:visible md:invisible"
        onClick={(e) => triggerDeleteDb(e, database.name)}
        test-id={`database-item-${database}-delete`}
      >
        x
      </span>
    </li>
  )
}

export default DatabaseName
