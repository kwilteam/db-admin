import { IDatasetInfoStringOwner } from "@/utils/database-types"
import classNames from "classnames"
import {
  ActionIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  QueryIcon,
  TableIcon,
} from "@/utils/icons"

import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  setDatabaseVisibility,
  selectDatabaseSchemas,
  selectDatabaseVisibility,
} from "@/store/database"
import { TablesActionsList } from "./TablesActionsList"
import QueriesList from "./QueriesList"

export interface IItemTypes {
  [key: string]: "tables" | "actions" | "queries"
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

  const visible = databaseVisibility[database.dbid]?.[itemType]
  const databaseSchemaItems =
    databaseSchemas &&
    itemType !== "queries" &&
    databaseSchemas[database.dbid]?.[itemType]

  const setVisibility = () => {
    dispatch(
      setDatabaseVisibility({
        dbid: database.dbid,
        key: itemType,
      }),
    )
  }

  return (
    <>
      <div
        test-id={`database-item-${database}-${itemType}`}
        className={classNames(
          "flex cursor-pointer select-none flex-row items-center gap-1 text-sm",
          {
            "text-slate-500 hover:text-slate-900": !visible,
            "text-slate-900": visible,
          },
        )}
        onClick={setVisibility}
      >
        <ItemIcons itemType={itemType} visible={visible} />

        <span className="capitalize">{itemType}</span>
      </div>
      <div className="mb-1">
        {visible &&
          (itemType === "actions" || itemType === "tables") &&
          databaseSchemaItems && (
            <TablesActionsList
              dbid={database.dbid}
              items={databaseSchemaItems}
              itemType={itemType}
              visible={visible}
            />
          )}

        {visible && itemType === "queries" && (
          <QueriesList dbid={database.dbid} />
        )}
      </div>
    </>
  )
}

const ItemIcons = ({
  itemType,
  visible,
}: {
  itemType: IItemTypes[string]
  visible: boolean
}) => {
  return (
    <>
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
      {itemType === "queries" && (
        <QueryIcon
          className={classNames({
            "h-4 w-4": true,
            "text-kwil-light": visible,
          })}
        />
      )}
    </>
  )
}

export default DatabaseItem
