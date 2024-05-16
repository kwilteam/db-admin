import { Types as KwilTypes } from "@lukelamey/kwil-js"
import { IQuery } from "./idb/queries"

// Types from the Kwil library
export type { KwilTypes }

// Dictionary of database names to their schema
export interface IDatabaseSchemaDict {
  [key: string]: KwilTypes.Database | null
}

export interface IDatabaseQueryDict {
  [dbid: string]: IQuery[]
}

export enum ItemType {
  TABLE = "table",
  ACTION = "action",
  QUERY = "query",
}

export enum ItemTypes {
  TABLES = "tables",
  ACTIONS = "actions",
  QUERIES = "queries",
}

// Whether a database is visible, and whether its tables and actions are visible
interface IDatabaseVisibility {
  open: boolean
  tables: boolean
  actions: boolean
  queries: boolean
  loading: boolean
}

// Dictionary of database names to their visibility
export interface IDatabaseVisibilityDict {
  [key: string]: IDatabaseVisibility
}

export interface ITableQueryParams {
  pagination: IPagination
  filters: ITableFilter[]
  sort: ITableSort[]
}

export interface ITableQueryParamsDict {
  [database: string]: {
    [table: string]: ITableQueryParams
  }
}

export interface IPagination {
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

export interface IDatasetInfoStringOwner {
  name: string
  owner: string
  dbid: string
}

export interface IDatabaseQueryPaginationDict {
  [dbid: string]: {
    [queryName: string]: IPagination
  }
}
