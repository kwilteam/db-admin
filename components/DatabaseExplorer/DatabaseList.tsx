import classNames from "classnames"
import { INamespaceInfo } from "@/utils/database-types"
import { OtherIcon, PinIcon } from "@/utils/icons"
import { selectDatabaseFilters } from "@/store/database"
import { useAppSelector } from "@/store/hooks"
import DatabaseName from "./DatabaseName"
import DatabaseSchema from "./DatabaseSchema"

interface IDatabaseListProps {
  databases: INamespaceInfo[] | undefined
  loading: boolean
  isMobile: boolean
  isDbOwner: boolean
  activeAccount?: string | undefined
  isPinned?: boolean
}

export default function DatabaseList({
  databases,
  loading,
  isDbOwner,
  isPinned,
}: IDatabaseListProps): JSX.Element {
  const filters = useAppSelector(selectDatabaseFilters)

  const search = filters.search

  const filteredDatabases = databases?.filter((db) => {
    return db.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="flex flex-col" data-testid="database-list">
      <div className="mb-1 mt-2 flex px-2 text-xs text-kwil">
        <div className="flex items-center gap-1">
          {isPinned ? (
            <>
              <PinIcon className="h-4 w-4" />
              <span>PINNED NAMESPACES</span>
            </>
          ) : (
            <>
              <OtherIcon className="h-4 w-4" />
              <span>NAMESPACES</span>
            </>
          )}
        </div>
      </div>

      {/* When DBs are found for this list */}
      {filteredDatabases &&
        filteredDatabases.map((database, index) => (
          <div key={index} className="">
            <DatabaseName database={database} isDbOwner={isDbOwner} />
            <DatabaseSchema database={database} />
          </div>
        ))}

      {/* When No DBs are found for this list */}
      {filteredDatabases &&
        filteredDatabases.length === 0 && (
          <div className="ml-7 flex justify-start">
            <p
              className={classNames("text-sm italic text-slate-500", {
                visible: !loading,
                invisible: loading,
              })}
            >
              {!loading ? "No databases were found" : "&nbsp;"}
            </p>
          </div>
        )}
    </div>
  )
}
