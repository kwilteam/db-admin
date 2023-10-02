import { KwilTypes } from "@/utils/database-types"
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
  selectDatabaseStructures,
  selectDatabaseVisibility,
} from "@/store/database"
import useDatabaseParams from "@/hooks/useDatabaseParams"
import { Dispatch, SetStateAction } from "react"

interface IItemTypes {
  [key: string]: "tables" | "actions"
}

const DatabaseItem = ({
  database,
  itemType,
  setIsMenuOpen = () => {},
}: {
  database: string
  itemType: IItemTypes[string]
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const dispatch = useAppDispatch()
  const databaseStructures = useAppSelector(selectDatabaseStructures)
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  const visible = databaseVisibility[database]?.[itemType]
  const databaseStructureItems =
    databaseStructures && databaseStructures[database]?.[itemType]

  return (
    <>
      <div
        className={classNames({
          "flex cursor-pointer select-none flex-row items-center gap-1 text-sm":
            true,
          "text-slate-500 hover:text-slate-900": !visible,
          "text-slate-900": visible,
        })}
        onClick={() =>
          dispatch(
            setDatabaseVisibility({
              database,
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
          databaseStructureItems &&
          databaseStructureItems.map(
            (
              objectItem: KwilTypes.Table<string> | KwilTypes.ActionSchema,
              index: number,
            ) => (
              <DatabaseItemLink
                key={index}
                database={database}
                itemName={objectItem.name}
                itemType={itemType}
                setIsMenuOpen={setIsMenuOpen}
              />
            ),
          )}

        {visible &&
          databaseStructureItems &&
          databaseStructureItems?.length == 0 && (
            <div className="ml-10 text-xs">No {itemType} found</div>
          )}
      </div>
    </>
  )
}

const DatabaseItemLink = ({
  database,
  itemName,
  itemType,
  setIsMenuOpen = () => {},
}: {
  database: string
  itemName: string
  itemType: IItemTypes[string]
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const singularItemType = itemType.slice(0, -1)
  const { db, table: activeTable, action: activeAction } = useDatabaseParams()

  const active =
    (db === database && itemType === "tables" && activeTable === itemName) ||
    (db === database && itemType === "actions" && activeAction === itemName)

  return (
    <div
      key={`${database}-${itemType}-${itemName}`}
      className="ml-6 overflow-hidden text-sm"
    >
      <Link
        href={`/databases/${database}/${singularItemType}/${itemName}`}
        className={classNames({
          "flex select-none flex-row items-center gap-1 hover:text-slate-900":
            true,
          "text-slate-500 ": !active,
          "font-semibold text-slate-900": active,
        })}
        onClick={() => {
          setIsMenuOpen(false)
        }}
      >
        <ChevronRightIcon className="h-3 w-3" />
        <span className="max-w-[80%]">{itemName}</span>
      </Link>
    </div>
  )
}

export default DatabaseItem
