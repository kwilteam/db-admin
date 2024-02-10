import { useState } from "react"
import classNames from "classnames"
import { Switch } from "@headlessui/react"
import {
  selectDatabaseFilters,
  setDataFilterSearch,
  setDataFilterShowAll,
  setDatabases,
} from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

export default function DatabaseFilters() {
  const dispatch = useAppDispatch()
  const databaseFilters = useAppSelector(selectDatabaseFilters)
  const [currentSearch, setCurrentSearch] = useState(databaseFilters.search)
  const [debounceTimer, setDebounceTimer] = useState<
    NodeJS.Timeout | undefined
  >(undefined)

  const handleToggleShowAll = () => {
    dispatch(setDatabases(undefined))
    dispatch(setDataFilterShowAll(!databaseFilters.showAll))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value)
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    setDebounceTimer(
      setTimeout(() => {
        dispatch(setDataFilterSearch(event.target.value))
      }, 300),
    )
  }

  const clearSearch = () => {
    dispatch(setDataFilterSearch(""))
  }

  return (
    <div className="mx-2 mb-2 mt-1 flex items-center gap-2">
      <div className="relative w-5/6">
        <input
          type="text"
          value={currentSearch}
          onChange={handleSearchChange}
          className="h-12 w-full rounded-md border p-1 pl-2 text-sm"
          placeholder="Filter databases..."
        />
        {databaseFilters.search && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-sm text-slate-400 hover:text-slate-600"
          >
            x
          </button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-xs text-slate-400">All DBs</span>
        <Switch
          checked={databaseFilters.showAll}
          onChange={handleToggleShowAll}
          className={classNames(
            databaseFilters.showAll ? "bg-kwil" : "bg-slate-200",
            "relative inline-flex h-6 w-11 items-center rounded-full",
          )}
        >
          <span
            className={classNames(
              databaseFilters.showAll ? "translate-x-6" : "translate-x-1",
              "inline-block h-4 w-4 transform rounded-full bg-white transition",
            )}
          />
        </Switch>
      </div>
    </div>
  )
}
