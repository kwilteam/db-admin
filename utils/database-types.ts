import { Types as KwilTypes } from "kwil"

// Having to include this here as the original definition for body throws errors.
// In initial definition the body returns a Nillable<string>, but for the actions I run I am receiving Object[]
export interface TxReceipt {
  get txHash(): string
  get fee(): string
  get body(): Object[] | undefined
}

// Types from the Kwil library
export type { KwilTypes }

// Dictionary of database names to their object
export interface IDatabaseStructureDict {
  [key: string]: KwilTypes.Database<string> | null
}

// Whether a database is visible, and whether its tables and actions are visible
interface IDatabaseVisibility {
  isVisible: boolean
  tables: boolean
  actions: boolean
}

// Dictionary of database names to their visibility
export interface IDatabaseVisibilityDict {
  [key: string]: IDatabaseVisibility
}

export interface ITableQueryParams {
  pagination: ITablePagination
  filters: ITableFilters
  sort: ITableSort
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

export interface ITableFilters {
  [key: string]: string
}

export interface ITableSort {
  [key: string]: "asc" | "desc"
}
