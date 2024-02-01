import { useEffect, useState } from "react"
import { selectDatabaseObject, selectTableQueryParams } from "@/store/database"
import { useAppSelector } from "@/store/hooks"
import { useKwilProvider } from "../kwil/useKwilProvider"
import { ITableQueryParams } from "@/utils/database-types"

interface IDataTableProps {
  database: string
  table: string
}

export default function useDataTable({ database, table }: IDataTableProps) {
  const [tableData, setTableData] = useState<Object[] | undefined>()
  const [totalCount, setTotalCount] = useState<number | undefined>()
  const [columns, setColumns] = useState<string[] | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { readOnlyKwilProvider } = useKwilProvider()
  const tableQueryParams = useAppSelector((state) =>
    selectTableQueryParams(state, database, table),
  )
  const databaseObject = useAppSelector((state) =>
    selectDatabaseObject(state, database),
  )

  useEffect(() => {
    if (
      !database ||
      !table ||
      !readOnlyKwilProvider ||
      // !tableQueryParams ||
      !databaseObject
    ) {
      console.log("useDataTable: missing dependencies")
      console.log("database", database)
      console.log("table", table)
      console.log("readOnlyKwilProvider", readOnlyKwilProvider)
      console.log("tableQueryParams", tableQueryParams)
      console.log("databaseObject", databaseObject)

      return
    }

    const fetchTableData = async () => {
      try {
        setIsLoading(true)

        const tableDataQuery = buildQuery(table, tableQueryParams)
        const dbid = databaseObject?.dbid

        const queryResponse = await readOnlyKwilProvider.selectQuery(
          dbid,
          tableDataQuery,
        )
        setTableData(queryResponse?.data)

        if (queryResponse.data && queryResponse.data?.length > 0) {
          const columns = Object.keys(queryResponse.data[0])
          setColumns(columns)
        }

        const tableCountQuery = `SELECT count(*) as count FROM ${table}`
        const response = await readOnlyKwilProvider.selectQuery(
          dbid,
          tableCountQuery,
        )

        const countData = response.data?.[0] as { count: number }

        setTotalCount(countData?.count)

        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTableData()
  }, [database, table, tableQueryParams, readOnlyKwilProvider, databaseObject])

  return { tableData, totalCount, columns, isLoading }
}

const buildQuery = (
  table: string,
  queryParams: ITableQueryParams | undefined,
): string => {
  // Will receive the pagination, sortBy, filterBy, etc. from the frontend
  let query = `SELECT * FROM ${table}`

  if (queryParams?.filters) {
    const { filters } = queryParams
    const hasValidFilters = filters.filter(
      (filter) => filter.column && filter.operator && filter.value,
    )

    if (hasValidFilters.length > 0) {
      query += " WHERE"

      hasValidFilters.forEach((filter, index) => {
        if (filter.operator === "is") {
          query += ` ${filter.column} IS ${filter.value}`
        } else {
          query += ` ${filter.column} ${filter.operator} '${filter.value}'`
        }

        if (index < hasValidFilters.length - 1) query += " AND"
      })
    }
  }

  if (queryParams?.sort) {
    const sort = queryParams.sort

    sort.forEach((sortItem, index) => {
      if (index === 0) {
        query += ` ORDER BY ${sortItem.column} ${sortItem.direction}`
      } else {
        query += `, ${sortItem.column} ${sortItem.direction}`
      }
    })
  }

  if (queryParams?.pagination) {
    const { currentPage, perPage } = queryParams.pagination

    query += ` LIMIT ${(currentPage - 1) * perPage},  ${perPage}`
  } else {
    query += ` LIMIT 0, 10`
  }

  console.log("Query", query)

  return query
}
