import { INamespaceInfo, ItemTypes } from "@/utils/database-types"
import classNames from "classnames"
import {
  ActionIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ProcedureIcon,
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
  [key: string]: ItemTypes
}

const DatabaseItem = ({
  database,
  itemType,
}: {
  database: INamespaceInfo
  itemType: IItemTypes[string]
}) => {
  const dispatch = useAppDispatch()
  const databaseSchemas = useAppSelector(selectDatabaseSchemas)
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)
  const visible = databaseVisibility[database.name]?.[itemType]
  const databaseSchemaItems =
    databaseSchemas &&
    itemType !== ItemTypes.QUERIES &&
    databaseSchemas[database.name]?.[itemType]

  const setVisibility = () => {
    dispatch(
      setDatabaseVisibility({
        dbid: database.name,
        key: itemType,
      }),
    )
  }

  return (
    <>
      <div
        data-testid={`database-item-${database.name}-${itemType}`}
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
          (itemType === ItemTypes.ACTIONS || itemType === ItemTypes.TABLES) &&
          databaseSchemaItems && (
            <TablesActionsList
              dbid={database.name}
              items={databaseSchemaItems}
              itemType={itemType}
              visible={visible}
            />
          )}

        {visible && itemType === ItemTypes.QUERIES && (
          <QueriesList dbid={database.name} />
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
      {itemType === ItemTypes.TABLES && (
        <TableIcon
          className={classNames({
            "h-4 w-4": true,
            "text-kwil-light": visible,
          })}
        />
      )}
      {itemType === ItemTypes.ACTIONS && (
        <ActionIcon
          className={classNames({
            "h-4 w-4": true,
            "text-kwil-light": visible,
          })}
        />
      )}
      {itemType === ItemTypes.QUERIES && (
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
