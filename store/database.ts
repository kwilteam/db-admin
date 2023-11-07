import {
  IDatabaseStructureDict,
  IDatabaseVisibilityDict,
  ITableQueryParamsDict,
  ITableQueryParams,
  ITablePagination,
  ITableFilter,
  ITableSort,
  KwilTypes,
} from "@/utils/database-types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IDatabaseActiveContext {
  database: string
  type: "table" | "action"
  name: string
}

interface IDatabaseState {
  structureDict: IDatabaseStructureDict | undefined
  visibilityDict: IDatabaseVisibilityDict
  tableQueryParamsDict: ITableQueryParamsDict
  activeContext: IDatabaseActiveContext | undefined
}

const initialState: IDatabaseState = {
  structureDict: undefined,
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
      action: PayloadAction<IDatabaseStructureDict>,
    ) => {
      state.structureDict = action.payload
    },

    setDatabaseObject: (
      state: IDatabaseState,
      action: PayloadAction<{
        database: string
        structure: KwilTypes.Database
      }>,
    ) => {
      if (!state.structureDict) state.structureDict = {}

      state.structureDict[action.payload.database] = action.payload.structure
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
      action: PayloadAction<IDatabaseActiveContext>,
    ) => {
      state.activeContext = action.payload
    },

    removeDatabase: (state: IDatabaseState, action: PayloadAction<string>) => {
      const database = action.payload

      if (!state.structureDict) return

      delete state.structureDict[database]
      delete state.visibilityDict[database]
      delete state.tableQueryParamsDict[database]
    },

    addDatabase: (state: IDatabaseState, action: PayloadAction<string>) => {
      const database = action.payload

      if (!state.structureDict) return

      state.structureDict[database] = null
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
  setDatabaseObject,
  setDatabaseVisibility,
  setDatabaseLoading,
  setDatabaseActiveContext,
  removeDatabase,
  addDatabase,
  setTablePagination,
  setTableFilters,
  setTableSort,
} = databaseSlice.actions

export const selectDatabaseStructures = (state: { database: IDatabaseState }) =>
  state.database.structureDict

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
  const actions = state.database.structureDict?.[database]?.actions

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
  if (!tableQueryParams) return undefined

  return tableQueryParams
}

export default databaseSlice.reducer
