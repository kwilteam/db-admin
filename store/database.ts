import {
  IDatabaseSchemaDict,
  IDatabaseVisibilityDict,
  ITableQueryParamsDict,
  ITableQueryParams,
  ITablePagination,
  ITableFilter,
  ITableSort,
  KwilTypes,
  IDatasetInfoStringOwner,
} from "@/utils/database-types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IDatabaseActiveContext {
  dbid: string
  type: "table" | "action"
  name: string
}

export interface IDatabaseFilters {
  showAll: boolean
  search: string
}

interface IDatabaseState {
  databases: IDatasetInfoStringOwner[] | undefined
  databaseFilters: IDatabaseFilters
  schemaDict: IDatabaseSchemaDict
  visibilityDict: IDatabaseVisibilityDict
  tableQueryParamsDict: ITableQueryParamsDict
  activeContext: IDatabaseActiveContext | undefined
}

const initialState: IDatabaseState = {
  databases: undefined,
  databaseFilters: {
    showAll: true,
    search: "",
  },
  schemaDict: {},
  visibilityDict: {},
  tableQueryParamsDict: {},
  activeContext: undefined,
}

export const databaseSlice = createSlice({
  name: "database",
  initialState: initialState,
  reducers: {
    setDatabases: (
      state: IDatabaseState,
      action: PayloadAction<IDatasetInfoStringOwner[] | undefined>,
    ) => {
      state.databases = action.payload
    },

    setDataFilterSearch: (
      state: IDatabaseState,
      action: PayloadAction<string>,
    ) => {
      state.databaseFilters.search = action.payload
    },

    setDataFilterShowAll: (
      state: IDatabaseState,
      action: PayloadAction<boolean>,
    ) => {
      state.databaseFilters.showAll = action.payload
    },

    setDatabaseSchema: (
      state: IDatabaseState,
      action: PayloadAction<{
        dbid: string
        schema: KwilTypes.Database
      }>,
    ) => {
      const { dbid, schema } = action.payload
      state.schemaDict[dbid] = schema
    },

    setDatabaseVisibility: (
      state: IDatabaseState,
      action: PayloadAction<{
        dbid: string
        key: keyof IDatabaseVisibilityDict[string]
        isVisible?: boolean
      }>,
    ) => {
      const { dbid, key, isVisible } = action.payload
      const currentVisibility = state.visibilityDict[dbid]?.[key]

      state.visibilityDict[dbid] = {
        ...state.visibilityDict[dbid],
        [key]: isVisible !== undefined ? isVisible : !currentVisibility,
      }
    },

    setDatabaseLoading: (
      state: IDatabaseState,
      action: PayloadAction<{
        dbid: string
        loading: boolean
      }>,
    ) => {
      const { dbid, loading } = action.payload

      state.visibilityDict[dbid] = {
        ...state.visibilityDict[dbid],
        loading,
      }
    },

    setDatabaseActiveContext: (
      state: IDatabaseState,
      action: PayloadAction<IDatabaseActiveContext | undefined>,
    ) => {
      state.activeContext = action.payload
    },

    removeDatabase: (state: IDatabaseState, action: PayloadAction<string>) => {
      const dbid = action.payload

      state.databases = state.databases?.filter((db) => db.dbid !== dbid)

      delete state.schemaDict[dbid]
      delete state.visibilityDict[dbid]
      delete state.tableQueryParamsDict[dbid]
    },

    setTablePagination: (
      state: IDatabaseState,
      action: PayloadAction<{
        dbid: string
        table: string
        pagination: ITablePagination
      }>,
    ) => {
      const { dbid, table, pagination } = action.payload

      state.tableQueryParamsDict[dbid] = {
        ...state.tableQueryParamsDict[dbid],
        [table]: {
          ...state.tableQueryParamsDict[dbid]?.[table],
          pagination,
        },
      }
    },

    setTableFilters: (
      state: IDatabaseState,
      action: PayloadAction<{
        dbid: string
        table: string

        filters: ITableFilter[]
      }>,
    ) => {
      const { dbid, table, filters } = action.payload

      state.tableQueryParamsDict[dbid] = {
        ...state.tableQueryParamsDict[dbid],
        [table]: {
          ...state.tableQueryParamsDict[dbid]?.[table],
          filters,
        },
      }
    },

    setTableSort: (
      state: IDatabaseState,
      action: PayloadAction<{
        dbid: string
        table: string

        sort: ITableSort[]
      }>,
    ) => {
      const { dbid, table, sort } = action.payload

      state.tableQueryParamsDict[dbid] = {
        ...state.tableQueryParamsDict[dbid],
        [table]: {
          ...state.tableQueryParamsDict[dbid]?.[table],
          sort,
        },
      }
    },
  },
})

export const {
  setDatabases,
  setDataFilterSearch,
  setDataFilterShowAll,
  setDatabaseSchema,
  setDatabaseVisibility,
  setDatabaseLoading,
  setDatabaseActiveContext,
  removeDatabase,
  setTablePagination,
  setTableFilters,
  setTableSort,
} = databaseSlice.actions

export const selectDatabases = (state: { database: IDatabaseState }) =>
  state.database.databases

export const selectDatabaseFilters = (state: { database: IDatabaseState }) =>
  state.database.databaseFilters

export const selectDatabaseSchemas = (state: { database: IDatabaseState }) =>
  state.database.schemaDict

export const selectDatabaseVisibility = (state: { database: IDatabaseState }) =>
  state.database.visibilityDict

export const selectDatabaseActiveContext = (state: {
  database: IDatabaseState
}) => {
  const activeContext = state.database.activeContext

  if (!activeContext) return false

  return activeContext
}

export const selectAction = (
  state: { database: IDatabaseState },
  dbid: string,
  actionName: string,
) => {
  const actions = state.database.schemaDict?.[dbid]?.actions

  if (!actions) return undefined

  return actions.find((action) => action.name === actionName)
}

export const selectTableQueryParams = (
  state: { database: IDatabaseState },
  dbid: string,
  table: string,
): ITableQueryParams | undefined => {
  const tableQueryParams = state.database.tableQueryParamsDict?.[dbid]?.[table]

  return tableQueryParams
}

export const selectDatabaseObject = (
  state: { database: IDatabaseState },
  dbid: string,
): IDatasetInfoStringOwner | undefined => {
  return state.database.databases?.find((db) => db.dbid === dbid)
}

export default databaseSlice.reducer
