import { ITableQueryParams } from "./database-types"

export const buildQuery = (
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
