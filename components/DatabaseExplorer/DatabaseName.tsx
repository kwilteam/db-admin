import classNames from "classnames"
import { ChevronDownIcon, ChevronRightIcon, DatabaseIcon } from "@/utils/icons"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  selectDatabaseVisibility,
  setDatabaseVisibility,
} from "@/store/database"
import { IDatasetInfoStringOwner } from "@/utils/database-types"
import useDatabaseSchema from "@/hooks/database/use-database-schema"
import useDeleteDb from "@/hooks/database/use-delete-db"
import Loading from "../Loading"

const DatabaseName = ({
  database,
  isMyDatabase,
}: {
  database: IDatasetInfoStringOwner
  isMyDatabase?: boolean
}) => {
  const { getSchema } = useDatabaseSchema()
  const dispatch = useAppDispatch()
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  const isVisible = databaseVisibility[database.dbid]?.isVisible

  const getSchemaOrHide = (database: IDatasetInfoStringOwner) => {
    if (isVisible) {
      dispatch(
        setDatabaseVisibility({
          dbid: database.dbid,
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
      className={classNames(
        "group relative ml-5 flex cursor-pointer select-none flex-row items-center gap-1 p-1 text-sm",
        {
          "text-slate-500 hover:text-slate-900": !isVisible,
          "text-slate-900": isVisible,
        },
      )}
      onClick={() => getSchemaOrHide(database)}
    >
      <ChevronDownIcon
        className={classNames("h-4 w-4", { hidden: !isVisible })}
      />
      <ChevronRightIcon
        className={classNames("h-4 w-4", { hidden: isVisible })}
      />
      <DatabaseIcon
        className={classNames("h-4 w-4", { "text-amber-500": isVisible })}
      />

      <span
        className="overflow-hidden text-ellipsis whitespace-nowrap"
        style={{ maxWidth: "calc(100% - 55px)" }}
      >
        {database.name}
      </span>

      {databaseVisibility[database.dbid]?.loading && (
        <Loading className="absolute right-0 ml-2" />
      )}

      {!databaseVisibility[database.dbid]?.loading && (
        <DeleteDatabase isMyDatabase={isMyDatabase} database={database} />
      )}
    </li>
  )
}

export default DatabaseName

function DeleteDatabase({
  isMyDatabase,
  database,
}: {
  isMyDatabase?: boolean
  database: IDatasetInfoStringOwner
}) {
  const triggerDeleteDb = useDeleteDb(database)

  return (
    <span
      className={classNames(
        "absolute right-0 ml-auto bg-white px-2 text-slate-400 hover:text-slate-700",
        {
          hidden: !isMyDatabase,
          "flex md:hidden": isMyDatabase,
          "md:group-hover:flex": isMyDatabase,
        },
      )}
      onClick={(e) => triggerDeleteDb(e)}
      test-id={`database-item-${database.dbid}-delete`}
    >
      x
    </span>
  )
}
