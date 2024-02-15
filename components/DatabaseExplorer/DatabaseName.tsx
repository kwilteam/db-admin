import classNames from "classnames"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DatabaseIcon,
  UserIcon,
} from "@/utils/icons"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  selectDatabaseVisibility,
  setDatabaseVisibility,
} from "@/store/database"
import { IDatasetInfoStringOwner } from "@/utils/database-types"
import useDatabaseSchema from "@/hooks/database/useDatabaseSchema"
import useDeleteDb from "@/hooks/database/useDeleteDb"

const DatabaseName = ({
  database,
  myDatabase,
}: {
  database: IDatasetInfoStringOwner
  myDatabase?: boolean
}) => {
  const { getSchema } = useDatabaseSchema()
  const dispatch = useAppDispatch()
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)
  const triggerDeleteDb = useDeleteDb(database)

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
        "group ml-2 flex cursor-pointer select-none flex-row items-center gap-1 p-1 text-sm",
        {
          "text-slate-500 hover:text-slate-900": !isVisible,
          "text-slate-900": isVisible,
        },
      )}
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
          // "text-blue-400": myDatabase && !isVisible,
        })}
      />
      <span
        className={classNames({
          italic: myDatabase,
        })}
      >
        {database.name}
      </span>

      <UserIcon
        className={classNames({
          "h-4 w-4": true,
          hidden: !myDatabase,
          flex: myDatabase,
        })}
      />
      <span
        className={classNames(
          "ml-auto px-2 text-slate-400 hover:text-slate-700 md:hidden",
          {
            "group-hover:flex": myDatabase,
          },
        )}
        onClick={(e) => triggerDeleteDb(e)}
        test-id={`database-item-${database}-delete`}
      >
        x
      </span>
    </li>
  )
}

export default DatabaseName
