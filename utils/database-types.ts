import { Types as KwilTypes } from "@kwilteam/kwil-js"

// Types from the Kwil library
export type { KwilTypes }

// Dictionary of database names to their object
// export interface IDatabaseStructureDict {
//   [key: string]: KwilTypes.Database | null
// }

// Dictionary of database names to their schema

export interface IDatabaseSchemaDict {
  [key: string]: KwilTypes.Database | null
}

// Whether a database is visible, and whether its tables and actions are visible
interface IDatabaseVisibility {
  isVisible: boolean
  tables: boolean
  actions: boolean
  loading: boolean
}

// Dictionary of database names to their visibility
export interface IDatabaseVisibilityDict {
  [key: string]: IDatabaseVisibility
}

export interface ITableQueryParams {
  pagination: ITablePagination
  filters: ITableFilter[]
  sort: ITableSort[]
}

export interface ITableQueryParamsDict {
  [database: string]: {
    [table: string]: ITableQueryParams
  }
}

export interface ITablePagination {
  currentPage: number
  perPage: number
}

export interface ITableFilter {
  column: string
  operator: string
  value: string
}

export interface ITableSort {
  column: string
  direction: "asc" | "desc"
}

export interface IDatasetInfoWithoutOwner {
  name: string
  dbid: string
}
