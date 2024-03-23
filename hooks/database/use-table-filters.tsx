import { useMemo, useState } from "react"
import { selectTableQueryParams, setTableFilters } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ITableFilter } from "@/utils/database-types"

interface IUseFiltersProps {
  dbid: string
  table: string
  columns: string[]
  operators: string[]
}

export default function useTableFilters({
  dbid,
  table,
  columns,
  operators,
}: IUseFiltersProps) {
  const dispatch = useAppDispatch()
  const [tempFilters, setTempFilters] = useState<ITableFilter[]>([]) // Used to store filters before they are applied

  const activeFilters = useAppSelector((state) =>
    selectTableQueryParams(state, dbid, table),
  )?.filters

  const copyActiveFilters = () => {
    if (!activeFilters) return

    const activeFiltersCopy = activeFilters.map((filter) => ({ ...filter }))

    setTempFilters([...activeFiltersCopy])
  }

  const addFilter = () => {
    setTempFilters([
      ...tempFilters,
      { column: columns[0], operator: operators[0], value: "" },
    ])
  }

  const applyFilters = (close: () => void) => {
    dispatch(setTableFilters({ dbid, table, filters: tempFilters }))
    close()
  }

  const removeFilter = (index: number) => {
    setTempFilters(tempFilters.filter((_, i) => i !== index))
  }

  const setFilterValue = (
    index: number,
    key: keyof ITableFilter,
    newValue: string,
  ) => {
    const newFilters = tempFilters.map((filter, i) => {
      if (i !== index) return filter
      return { ...filter, [key]: newValue }
    })
    setTempFilters(newFilters)
  }

  const filterBtnText = useMemo(() => {
    if (!activeFilters || activeFilters.length === 0) return "Filter"
    if (activeFilters.length === 1) return "1 filter rule"
    return `${activeFilters.length} filter rules`
  }, [activeFilters])

  return {
    tempFilters,
    activeFilters,
    copyActiveFilters,
    addFilter,
    applyFilters,
    removeFilter,
    setFilterValue,
    filterBtnText,
  }
}
