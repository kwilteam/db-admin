import Link from "next/link"
import classNames from "classnames"
import { ItemTypes, KwilTypes } from "@/utils/database-types"
import { ChevronRightIcon } from "@/utils/icons"
import { useAppDispatch } from "@/store/hooks"
import { setIsMenuOpen } from "@/store/global"
import useDatabaseParams from "@/hooks/database/use-database-params"
import { IItemTypes } from "./DatabaseItem"

interface ITablesActionsList {
  dbid: string
  items: readonly KwilTypes.Table[] | readonly KwilTypes.ActionSchema[]
  itemType: IItemTypes[string]
  visible: boolean
}

export const TablesActionsList = ({
  dbid,
  items,
  itemType,
  visible,
}: ITablesActionsList) => {
  const dispatch = useAppDispatch()
  const {
    dbid: dbidParam,
    table: activeTable,
    action: activeAction,
  } = useDatabaseParams()

  return (
    <>
      {items.map((objectItem: KwilTypes.Table | KwilTypes.ActionSchema) => (
        <div
          test-id={`database-item-${dbid}-${itemType}-${objectItem.name}`}
          key={`${dbid}-${itemType}-${objectItem.name}`}
          className="ml-6 overflow-hidden text-sm"
        >
          <Link
            href={`/databases/${dbid}/${itemType.slice(0, -1)}/${
              objectItem.name
            }`}
            className={classNames({
              "flex select-none flex-row items-center gap-1 hover:text-slate-900":
                true,
              "text-slate-500 ": !isTableOrActionActive(
                dbidParam,
                dbid,
                itemType,
                activeTable,
                activeAction,
                objectItem.name,
              ),
              "font-semibold text-slate-900": isTableOrActionActive(
                dbidParam,
                dbid,
                itemType,
                activeTable,
                activeAction,
                objectItem.name,
              ),
            })}
            onClick={() => {
              dispatch(setIsMenuOpen(false))
            }}
          >
            <ChevronRightIcon className="h-3 w-3" />
            <span className="max-w-[80%]">{objectItem.name}</span>
          </Link>
        </div>
      ))}

      {visible && items && items.length == 0 && (
        <div className="ml-10 text-xs">No {itemType} found</div>
      )}
    </>
  )
}

const isTableOrActionActive = (
  dbidParam: string | undefined,
  dbid: string,
  itemType: IItemTypes[string],
  activeTable: string | undefined,
  activeAction: string | undefined,
  objectItemName: string,
) =>
  dbidParam === dbid &&
  ((itemType === ItemTypes.TABLES && activeTable === objectItemName) ||
    (itemType === ItemTypes.ACTIONS && activeAction === objectItemName))
