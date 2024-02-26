import { IDatasetInfoStringOwner } from "@/utils/database-types"
import { OtherIcon, UserIcon } from "@/utils/icons"
import {
  selectDatabaseFilters,
  setDataFilterIncludeAll,
} from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import DatabaseName from "./DatabaseName"
import DatabaseSchema from "./DatabaseSchema"
import classNames from "classnames"

interface IDatabaseListProps {
  databases: IDatasetInfoStringOwner[] | undefined
  loading: boolean
  myDatabase?: boolean
}

export default function DatabaseList({
  databases,
  loading,
  myDatabase,
}: IDatabaseListProps): JSX.Element {
  const dispatch = useAppDispatch()
  const includeOtherDatabases = useAppSelector(selectDatabaseFilters).includeAll

  const setIncludeOtherDatabases = () => {
    dispatch(setDataFilterIncludeAll(!includeOtherDatabases))
  }

  return (
    <div className="flex flex-col">
      <div className="mb-1 mt-2 flex px-2 text-xs text-kwil">
        {myDatabase ? (
          <div className="flex items-center gap-1">
            <UserIcon className="h-4 w-4" />
            <span>MY DATABASES</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <OtherIcon className="h-4 w-4" />
            <span>OTHER DATABASES</span>

            <input
              id="include-all"
              aria-describedby="include-all-description"
              name="include-all"
              type="checkbox"
              checked={includeOtherDatabases}
              onChange={setIncludeOtherDatabases}
              className="ml-1 h-4 w-4 rounded border-gray-300 text-kwil focus:ring-kwil"
            />
          </div>
        )}
      </div>
      {databases &&
        databases.map((database, index) => (
          <div key={index} className="">
            <DatabaseName database={database} myDatabase={myDatabase} />
            <DatabaseSchema database={database} />
          </div>
        ))}

      {(myDatabase || (!myDatabase && includeOtherDatabases)) &&
        databases &&
        databases.length === 0 && (
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
