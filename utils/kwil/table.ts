import { ITableQueryParams, KwilTypes, TxReceipt } from "@/utils/database-types"
import { getDatabaseId, getKwilInstance } from "./core"

export const getTableData = async (
  database: string,
  table: string,
  queryParams: ITableQueryParams,
): Promise<KwilTypes.GenericResponse<Object[]> | undefined> => {
  try {
    const kwil = getKwilInstance()
    const dbId = await getDatabaseId(database)

    const query = buildQuery(table, queryParams)

    const result = await kwil.selectQuery(dbId, query)

    if (result.status !== 200) throw new Error("Failed to fetch table data")

    return result
  } catch (error) {
    console.error(error)
  }
}

export const getTableTotalCount = async (
  database: string,
  table: string,
): Promise<KwilTypes.GenericResponse<Object[]> | undefined> => {
  try {
    const kwil = getKwilInstance()
    const dbId = await getDatabaseId(database)

    const query = `SELECT count(*) as count FROM ${table}`

    const result = await kwil.selectQuery(dbId, query)

    if (result.status !== 200) throw new Error("Failed to fetch table data")

    return result
  } catch (error) {
    console.error(error)
  }
}

const buildQuery = (table: string, queryParams: ITableQueryParams): string => {
  // Will receive the pagination, sortyBy, filterBy, etc. from the frontend
  let query = `SELECT * FROM ${table}`

  if (queryParams?.filters) {
    const filters = Object.entries(queryParams.filters)

    if (filters.length > 0) {
      query += " WHERE"

      filters.forEach(([key, value], index) => {
        query += ` ${key} = '${value}'`

        if (index < filters.length - 1) query += " AND"
      })
    }
  }

  if (queryParams?.sort) {
    const { sortBy, sortDirection } = queryParams.sort

    query += ` ORDER BY ${sortBy} ${sortDirection}`
  }

  if (queryParams?.pagination) {
    const { currentPage, perPage } = queryParams.pagination

    query += ` LIMIT ${(currentPage - 1) * perPage},  ${perPage}`
  } else {
    query += ` LIMIT 0, 50`
  }

  console.log(query)

  return query
}
