import { IDatasetInfoStringOwner, KwilTypes } from "@/utils/database-types"
import classNames from "classnames"
import {
  ActionIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  TableIcon,
} from "@/utils/icons"
import Link from "next/link"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  setDatabaseVisibility,
  selectDatabaseSchemas,
  selectDatabaseVisibility,
} from "@/store/database"
import useDatabaseParams from "@/hooks/database/useDatabaseParams"
import { setIsMenuOpen } from "@/store/global"

interface IItemTypes {
  [key: string]: "tables" | "actions"
}

const DatabaseItem = ({
  database,
  itemType,
}: {
  database: IDatasetInfoStringOwner
  itemType: IItemTypes[string]
}) => {
  const dispatch = useAppDispatch()
  const databaseSchemas = useAppSelector(selectDatabaseSchemas)
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  const visible = databaseVisibility[database.name]?.[itemType]
  const databaseSchemaItems =
    databaseSchemas && databaseSchemas[database.name]?.[itemType]

  return (
    <>
      <div
        test-id={`database-item-${database}-${itemType}`}
        className={classNames({
          "flex cursor-pointer select-none flex-row items-center gap-1 text-sm":
            true,
          "text-slate-500 hover:text-slate-900": !visible,
          "text-slate-900": visible,
        })}
        onClick={() =>
          dispatch(
            setDatabaseVisibility({
              database: database.name,
              key: itemType,
            }),
          )
        }
      >
        <ChevronDownIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: !visible,
          })}
        />
        <ChevronRightIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: visible,
          })}
        />
        {itemType === "tables" && (
          <TableIcon
            className={classNames({
              "h-4 w-4": true,
              "text-kwil-light": visible,
            })}
          />
        )}
        {itemType === "actions" && (
          <ActionIcon
            className={classNames({
              "h-4 w-4": true,
              "text-kwil-light": visible,
            })}
          />
        )}
        <span className="capitalize">{itemType}</span>
      </div>
      <div className="mb-1">
        {visible &&
          databaseSchemaItems &&
          databaseSchemaItems.map(
            (
              objectItem: KwilTypes.Table | KwilTypes.ActionSchema,
              index: number,
            ) => (
              <DatabaseItemLink
                key={index}
                databaseName={database.name}
                itemName={objectItem.name}
                itemType={itemType}
              />
            ),
          )}

        {visible && databaseSchemaItems && databaseSchemaItems?.length == 0 && (
          <div className="ml-10 text-xs">No {itemType} found</div>
        )}
      </div>
    </>
  )
}

const DatabaseItemLink = ({
  databaseName,
  itemName,
  itemType,
}: {
  databaseName: string
  itemName: string
  itemType: IItemTypes[string]
}) => {
  const dispatch = useAppDispatch()
  const singularItemType = itemType.slice(0, -1)
  const {
    db: dbParam,
    table: activeTable,
    action: activeAction,
  } = useDatabaseParams()

  // For direct links, we need to check if the current item is active
  const active =
    (dbParam === databaseName &&
      itemType === "tables" &&
      activeTable === itemName) ||
    (dbParam === databaseName &&
      itemType === "actions" &&
      activeAction === itemName)

  return (
    <div
      test-id={`database-item-${databaseName}-${itemType}-${itemName}`}
      key={`${databaseName}-${itemType}-${itemName}`}
      className="ml-6 overflow-hidden text-sm"
    >
      <Link
        href={`/databases/${databaseName}/${singularItemType}/${itemName}`}
        className={classNames({
          "flex select-none flex-row items-center gap-1 hover:text-slate-900":
            true,
          "text-slate-500 ": !active,
          "font-semibold text-slate-900": active,
        })}
        onClick={() => {
          dispatch(setIsMenuOpen(false))
        }}
      >
        <ChevronRightIcon className="h-3 w-3" />
        <span className="max-w-[80%]">{itemName}</span>
      </Link>
    </div>
  )
}

export default DatabaseItem
