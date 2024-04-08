import { useState } from "react"
import { selectDatabaseFilters, setFilter } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

export default function DatabaseFilterSearch({ isMobile = false }) {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectDatabaseFilters)
  const [currentSearch, setCurrentSearch] = useState(filters.search)
  const [debounceTimer, setDebounceTimer] = useState<
    NodeJS.Timeout | undefined
  >(undefined)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value)
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    setDebounceTimer(
      setTimeout(() => {
        dispatch(setFilter({ key: "search", value: event.target.value.trim() }))
      }, 300),
    )
  }

  const clearSearch = () => {
    dispatch(setFilter({ key: "search", value: "" }))
    setCurrentSearch("")
  }

  return (
    <div className="mb-2 flex  h-10 items-center border-b">
      <input
        type="text"
        data-testid="database-filter-search"
        value={currentSearch}
        onChange={handleSearchChange}
        name={`search-${isMobile ? "mobile" : "desktop"}`} // To avoid duplicate id as Element IDs should be unique
        className="h-9 w-full border-none pl-2 text-sm focus:outline-none focus:ring-0"
        placeholder="Filter databases..."
      />
      {filters.search && (
        <button
          data-testid="database-filter-search-clear"
          onClick={clearSearch}
          className="pr-2 text-sm text-slate-400 hover:text-slate-600 "
        >
          x
        </button>
      )}
    </div>
  )
}
