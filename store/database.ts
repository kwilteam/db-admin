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
  database: string
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
        database: string
        schema: KwilTypes.Database
      }>,
    ) => {
      const { database, schema } = action.payload
      state.schemaDict[database] = schema
    },

    setDatabaseVisibility: (
      state: IDatabaseState,
      action: PayloadAction<{
        database: string
        key: keyof IDatabaseVisibilityDict[string]
        isVisible?: boolean
      }>,
    ) => {
      const { database, key, isVisible } = action.payload
      const currentVisibility = state.visibilityDict[database]?.[key]

      state.visibilityDict[database] = {
        ...state.visibilityDict[database],
        [key]: isVisible !== undefined ? isVisible : !currentVisibility,
      }
    },

    setDatabaseLoading: (
      state: IDatabaseState,
      action: PayloadAction<{
        database: string
        loading: boolean
      }>,
    ) => {
      const { database, loading } = action.payload

      state.visibilityDict[database] = {
        ...state.visibilityDict[database],
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
      const database = action.payload

      state.databases = state.databases?.filter((db) => db.name !== database)
      delete state.schemaDict[database]
      delete state.visibilityDict[database]
      delete state.tableQueryParamsDict[database]
    },

    addDatabase: (state: IDatabaseState, action: PayloadAction<string>) => {
      const database = action.payload

      if (!state.schemaDict) return

      state.schemaDict[database] = null
    },

    setTablePagination: (
      state: IDatabaseState,
      action: PayloadAction<{
        database: string
        table: string
        pagination: ITablePagination
      }>,
    ) => {
      const { database, table, pagination } = action.payload

      state.tableQueryParamsDict[database] = {
        ...state.tableQueryParamsDict[database],
        [table]: {
          ...state.tableQueryParamsDict[database]?.[table],
          pagination,
        },
      }
    },

    setTableFilters: (
      state: IDatabaseState,
      action: PayloadAction<{
        database: string
        table: string

        filters: ITableFilter[]
      }>,
    ) => {
      const { database, table, filters } = action.payload

      state.tableQueryParamsDict[database] = {
        ...state.tableQueryParamsDict[database],
        [table]: {
          ...state.tableQueryParamsDict[database]?.[table],
          filters,
        },
      }
    },

    setTableSort: (
      state: IDatabaseState,
      action: PayloadAction<{
        database: string
        table: string

        sort: ITableSort[]
      }>,
    ) => {
      const { database, table, sort } = action.payload

      state.tableQueryParamsDict[database] = {
        ...state.tableQueryParamsDict[database],
        [table]: {
          ...state.tableQueryParamsDict[database]?.[table],
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
  addDatabase,
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
  database: string,
  actionName: string,
) => {
  const actions = state.database.schemaDict?.[database]?.actions

  if (!actions) return undefined

  return actions.find((action) => action.name === actionName)
}

export const selectTableQueryParams = (
  state: { database: IDatabaseState },
  database: string,
  table: string,
): ITableQueryParams | undefined => {
  const tableQueryParams =
    state.database.tableQueryParamsDict?.[database]?.[table]

  return tableQueryParams
}

export const selectDatabaseObject = (
  state: { database: IDatabaseState },
  database: string,
): IDatasetInfoStringOwner | undefined => {
  return state.database.databases?.find((db) => db.name === database)
}

export default databaseSlice.reducer
