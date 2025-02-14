import classNames from "classnames"
import { ChevronDownIcon, ChevronRightIcon, DatabaseIcon, EmptyStarIcon, FilledStarIcon } from "@/utils/icons"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  selectDatabaseActiveContext,
  selectDatabaseVisibility,
  setDatabaseActiveContext,
  setDatabaseVisibility,
} from "@/store/database"
import { INamespaceInfo } from "@/utils/database-types"
import useDatabaseSchema from "@/hooks/database/use-database-schema"
import useDeleteDb from "@/hooks/database/use-delete-db"
import Loading from "../Loading"
import useDatabasePins from "@/hooks/database/use-database-pins"

const DatabaseName = ({
  database: namespace,
  isDbOwner,
}: {
  database: INamespaceInfo
  isDbOwner?: boolean
}) => {
  const { getSchema } = useDatabaseSchema()
  const dispatch = useAppDispatch()
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)
  const activeContext = useAppSelector(selectDatabaseActiveContext)
  const { togglePin, pinned }= useDatabasePins()
  const isPinned = pinned?.includes(namespace.name)

  const isOpen = databaseVisibility[namespace.name]?.open

  const getNamespaceOrHide = (namespace: INamespaceInfo) => {
    if (isOpen) {
      dispatch(
        setDatabaseVisibility({
          dbid: namespace.name,
          key: "open",
          value: false,
        }),
      )

      // If we are closing the DB and the active context is within that DB, we need to clear the active context
      // So that the DB doesn't auto load when we navigate back to the Databases page
      if (activeContext?.namespace === namespace.name) {
        dispatch(setDatabaseActiveContext(undefined))
      }
    } else {
      getSchema(namespace)
    }
  }

  return (
    <li
      data-testid={`database-item-${namespace.name}`}
      key={namespace.name}
      className={classNames(
        "group relative ml-5 flex cursor-pointer select-none flex-row items-center gap-1 p-1 text-sm",
        {
          "text-slate-500 hover:text-slate-900": !isOpen,
          "text-slate-900": isOpen,
        },
      )}
      onClick={() => getNamespaceOrHide(namespace)}
    >
      <ChevronDownIcon className={classNames("h-4 w-4", { hidden: !isOpen })} />
      <ChevronRightIcon className={classNames("h-4 w-4", { hidden: isOpen })} />
      <DatabaseIcon
        className={classNames("h-4 w-4", { "text-amber-500": isOpen })}
      />

      <span
        className="overflow-hidden text-ellipsis whitespace-nowrap"
        style={{ maxWidth: "calc(100% - 55px)" }}
      >
        {namespace.name}
      </span>
      
      {isPinned && 
        <FilledStarIcon 
          className={classNames("h-4 w-4 mr-3 ml-auto z-10")}
          onClick={(e) => togglePin(namespace.name, e)}
        />
      }

      {!isPinned &&
        <EmptyStarIcon 
          className={classNames("h-4 w-4 mr-3 ml-auto z-10")}
          onClick={(e) => togglePin(namespace.name, e)}
        />
      }

      {databaseVisibility[namespace.name]?.loading && (
        <Loading className="absolute right-0 ml-2" />
      )}

      {!databaseVisibility[namespace.name]?.loading && (
        <DeleteDatabase isMyDatabase={isDbOwner} database={namespace} />
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
  database: INamespaceInfo
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
      data-testid={`database-item-${database.name}-delete`}
    >
      x
    </span>
  )
}
