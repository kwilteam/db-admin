import classNames from "classnames"
import { IDatasetInfoStringOwner } from "@/utils/database-types"
import { OtherIcon, UserIcon } from "@/utils/icons"
import { selectIncludeAll, selectSearch, setIncludeAll } from "@/store/filters"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import DatabaseName from "./DatabaseName"
import DatabaseSchema from "./DatabaseSchema"

interface IDatabaseListProps {
  databases: IDatasetInfoStringOwner[] | undefined
  loading: boolean
  isMobile: boolean
  isMyDatabase: boolean
  activeAccount?: string | undefined
}

export default function DatabaseList({
  databases,
  loading,
  isMobile,
  isMyDatabase,
  activeAccount,
}: IDatabaseListProps): JSX.Element {
  const includeOtherDatabases = useAppSelector(selectIncludeAll)
  const search = useAppSelector(selectSearch)

  const filteredDatabases = databases?.filter((db) => {
    return db.name.includes(search)
  })

  return (
    <div className="flex flex-col" data-testid="database-list">
      <div className="mb-1 mt-2 flex px-2 text-xs text-kwil">
        {isMyDatabase ? (
          <div className="flex items-center gap-1">
            <UserIcon className="h-4 w-4" />
            <span>MY DATABASES</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <OtherIcon className="h-4 w-4" />
            <IncludeOtherDatabasesCheckbox
              activeAccount={activeAccount}
              isMobile={isMobile}
              includeOtherDatabases={includeOtherDatabases}
            />
          </div>
        )}
      </div>

      {/* When DBs are found for this list */}
      {filteredDatabases &&
        filteredDatabases.map((database, index) => (
          <div key={index} className="">
            <DatabaseName database={database} isMyDatabase={isMyDatabase} />
            <DatabaseSchema database={database} />
          </div>
        ))}

      {/* When No DBs are found for this list */}
      {(isMyDatabase || (!isMyDatabase && includeOtherDatabases)) &&
        filteredDatabases &&
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

function IncludeOtherDatabasesCheckbox({
  activeAccount,
  isMobile,
  includeOtherDatabases,
}: {
  activeAccount: string | undefined
  isMobile: boolean
  includeOtherDatabases: boolean
}): JSX.Element {
  const dispatch = useAppDispatch()

  const setIncludeOtherDatabases = () => {
    dispatch(setIncludeAll(!includeOtherDatabases))
  }

  return (
    <>
      {!activeAccount ? (
        <span>DATABASES</span>
      ) : (
        <>
          <span>OTHER DATABASES</span>
          <input
            aria-describedby="include-all-description"
            name={`include-all-${isMobile ? "mobile" : "desktop"}`} // To avoid duplicate id as Element IDs should be unique
            type="checkbox"
            checked={includeOtherDatabases}
            onChange={setIncludeOtherDatabases}
            className="ml-1 h-4 w-4 rounded border-gray-300 text-kwil focus:ring-kwil"
          />
        </>
      )}
    </>
  )
}
