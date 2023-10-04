import { useMemo, useState } from "react"
import { selectTableQueryParams, setTableSort } from "@/store/database"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ITableSort } from "@/utils/database-types"

interface IUseTableSortProps {
  database: string
  table: string
}

export default function useTableSort({ database, table }: IUseTableSortProps) {
  const dispatch = useAppDispatch()
  const [tempSort, setTempSort] = useState<ITableSort[]>([]) // Used to store Sorts before they are applied

  const activeSort = useAppSelector((state) =>
    selectTableQueryParams(state, database, table),
  )?.sort

  const copyActiveSort = () => {
    if (!activeSort) return

    const activeSortCopy = activeSort.map((sort) => ({ ...sort }))

    setTempSort([...activeSortCopy])
  }

  const addSort = (column: string) => {
    setTempSort([...tempSort, { column: column, direction: "asc" }])
  }

  const applySort = (close: () => void) => {
    dispatch(setTableSort({ database, table, sort: tempSort }))
    close()
  }

  const removeSort = (index: number) => {
    setTempSort(tempSort.filter((_, i) => i !== index))
  }

  const setSortValue = (
    index: number,
    key: keyof ITableSort,
    newValue: string,
  ) => {
    const newSorts = tempSort.map((Sort, i) => {
      if (i !== index) return Sort
      return { ...Sort, [key]: newValue }
    })
    setTempSort(newSorts)
  }

  const sortBtnText = useMemo(() => {
    if (!activeSort) return "Sort"
    if (activeSort.length === 0) return "Sort"
    if (activeSort.length === 1) return "1 sort rule"
    return `${activeSort.length} sort rules`
  }, [activeSort])

  return {
    setTempSort,
    tempSort,
    activeSort,
    copyActiveSort,
    addSort,
    applySort,
    removeSort,
    setSortValue,
    sortBtnText,
  }
}
