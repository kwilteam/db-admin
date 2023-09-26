import {
  IDatabaseStructureDict,
  IDatabaseVisibilityDict,
  ITableQueryParamsDict,
  ITableQueryParams,
  ITablePagination,
  ITableFilters,
  ITableSort,
  KwilTypes,
} from "@/utils/database-types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface DatabaseState {
  structureDict: IDatabaseStructureDict | undefined
  visibilityDict: IDatabaseVisibilityDict
  tableQueryParamsDict: ITableQueryParamsDict
}

const initialState: DatabaseState = {
  structureDict: undefined,
  visibilityDict: {},
  tableQueryParamsDict: {},
}

export const databaseSlice = createSlice({
  name: "database",
  initialState: initialState,
  reducers: {
    setDatabases: (
      state: DatabaseState,
      action: PayloadAction<IDatabaseStructureDict>,
    ) => {
      state.structureDict = action.payload
    },

    setDatabaseObject: (
      state: DatabaseState,
      action: PayloadAction<{
        database: string
        structure: KwilTypes.Database<string>
      }>,
    ) => {
      if (!state.structureDict) state.structureDict = {}

      state.structureDict[action.payload.database] = action.payload.structure
    },

    setDatabaseVisibility: (
      state: DatabaseState,
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

    setTablePagination: (
      state: DatabaseState,
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
      state: DatabaseState,
      action: PayloadAction<{
        database: string
        table: string

        filters: ITableFilters
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
      state: DatabaseState,
      action: PayloadAction<{
        database: string
        table: string

        sort: ITableSort
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
  setTablePagination,
  setTableFilters,
  setTableSort,
} = databaseSlice.actions

export const selectDatabaseStructures = (state: { database: DatabaseState }) =>
  state.database.structureDict

export const selectDatabaseVisibility = (state: { database: DatabaseState }) =>
  state.database.visibilityDict

export const selectAction = (
  state: { database: DatabaseState },
  database: string,
  actionName: string,
) => {
  const actions = state.database.structureDict?.[database]?.actions

  if (!actions) return undefined

  return actions.find((action) => action.name === actionName)
}

export const selectTableQueryParams = (
  state: { database: DatabaseState },
  database: string,
  table: string,
): ITableQueryParams | undefined => {
  const tableQueryParams =
    state.database.tableQueryParamsDict?.[database]?.[table]
  if (!tableQueryParams) return undefined

  return tableQueryParams
}

export default databaseSlice.reducer
