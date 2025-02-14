import { Types as KwilTypes } from "@kwilteam/kwil-js"
import { IQuery } from "./idb/queries"

// Types from the Kwil library
export type { KwilTypes }

export interface INamespaceItems {
  tables: ITableInfo[]
  actions: IActionInfo[]
}

// Dictionary of database names to their schema
export interface IDatabaseSchemaDict {
  [key: string]: INamespaceItems | null
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

export enum MethodTypes {
  ACTION = "action",
  PROCEDURE = "procedure",
}

// Whether a database is visible, and whether its tables and actions are visible
interface IDatabaseVisibility {
  open: boolean
  tables: boolean
  actions: boolean
  procedures: boolean
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

export interface INamespaceInfo {
  name: string
}

export interface ITableInfo {
  name: string
}

export interface IActionInfo {
  name: string
  raw_statement: string
  access_modifiers: string[]
  parameter_names: string[]
  parameter_types: string[]
  return_names: string[]
  return_types: string[]
  returns_table: boolean
  built_in: boolean
}

export interface IColumnInfo {
  name: string;
  data_type: string;
  is_nullable: boolean;
  default_value: string;
  is_primary_key: boolean;
  ordinal_position: number;
}

export interface IDatabaseQueryPaginationDict {
  [dbid: string]: {
    [queryName: string]: IPagination
  }
}
