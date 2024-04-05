import {
  IDatabaseSchemaDict,
  IDatabaseVisibilityDict,
  ITableQueryParamsDict,
  ITableQueryParams,
  IPagination,
  ITableFilter,
  ITableSort,
  KwilTypes,
  IDatasetInfoStringOwner,
  IDatabaseQueryDict,
  ItemType,
  IDatabaseQueryPaginationDict,
} from "@/utils/database-types"
import { initIdb } from "@/utils/idb/init"
import { deleteQuery, getQueries, setQuery } from "@/utils/idb/queries"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface IDatabaseActiveContext {
  dbid: string
  type: ItemType
  name: string
}

export interface IDatabaseFilters {
  includeAll: boolean
  search: string
}

// Define a type that maps keys to their respective value types
type FilterValueType<K extends keyof IDatabaseFilters> = IDatabaseFilters[K]

interface IDatabaseState {
  databases: IDatasetInfoStringOwner[] | undefined
  filters: IDatabaseFilters
  schemaDict: IDatabaseSchemaDict
  visibilityDict: IDatabaseVisibilityDict
  tableQueryParamsDict: ITableQueryParamsDict
  queryDict: IDatabaseQueryDict
  queryPaginationDict: IDatabaseQueryPaginationDict
  activeContext: IDatabaseActiveContext | undefined
}

const initialState: IDatabaseState = {
  databases: undefined,
  filters: {
    includeAll: true,
    search: "",
  },
  schemaDict: {},
  visibilityDict: {},
  tableQueryParamsDict: {},
  queryDict: {},
  queryPaginationDict: {},
  activeContext: undefined,
}

export const loadQueries = createAsyncThunk(
  "database/loadQueries",
  async (dbid: string, { rejectWithValue }) => {
    try {
      const db = await initIdb()
      if (!db) return rejectWithValue("Database initialization failed")

      const queries = await getQueries(db, dbid)

      return { dbid, queries }
    } catch (error) {
      console.error("Failed to load queries", error)
      return rejectWithValue("Failed to load queries")
    }
  },
)

export const deleteQueryFromStores = createAsyncThunk(
  "providers/deleteQueryFromStores",
  async (
    { dbid, name }: { dbid: string; name: string },
    { rejectWithValue },
  ) => {
    try {
      const db = await initIdb()
      if (!db) throw new Error("Database initialization failed")

      await deleteQuery(db, dbid, name)

      const queries = await getQueries(db, dbid)

      return { dbid, queries }
    } catch (error) {
      console.error("Failed to delete query", error)
      return rejectWithValue("Failed to delete query")
    }
  },
)

export const saveQueryToStores = createAsyncThunk(
  "providers/saveQueryToStores",
  async (
    { dbid, name, sql }: { dbid: string; name: string; sql: string },
    { rejectWithValue },
  ) => {
    try {
      const db = await initIdb()
      if (!db) throw new Error("Database initialization failed")

      await setQuery(db, dbid, name, sql)

      const queries = await getQueries(db, dbid)

      return { dbid, queries }
    } catch (error) {
      console.error("Failed to save query", error)
      return rejectWithValue("Failed to save query")
    }
  },
)

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

    setFilter: <K extends keyof IDatabaseFilters>(
      state: IDatabaseState,
      action: PayloadAction<{
        key: K
        value: FilterValueType<K>
      }>,
    ) => {
      const { key, value } = action.payload
      state.filters[key] = value
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
        value?: boolean
      }>,
    ) => {
      const { dbid, key, value } = action.payload
      const currentVisibility = state.visibilityDict[dbid]?.[key]

      state.visibilityDict[dbid] = {
        ...state.visibilityDict[dbid],
        [key]: value !== undefined ? value : !currentVisibility,
      }
    },

    setDatabaseClosed: (
      state: IDatabaseState,
      action: PayloadAction<{
        dbid: string
      }>,
    ) => {
      const { dbid } = action.payload

      state.visibilityDict[dbid] = {
        open: false,
        tables: false,
        actions: false,
        queries: false,
        loading: false,
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
        pagination: IPagination
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
    setQueryPagination: (
      state: IDatabaseState,
      action: PayloadAction<{
        dbid: string
        queryName: string
        pagination: IPagination
      }>,
    ) => {
      const { dbid, queryName, pagination } = action.payload

      state.queryPaginationDict[dbid] = {
        ...state.queryPaginationDict[dbid],
        [queryName]: pagination,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadQueries.fulfilled, (state, action) => {
      if (!action.payload) return
      const { dbid, queries } = action.payload

      state.queryDict[dbid] = queries
    }),
      builder.addCase(saveQueryToStores.fulfilled, (state, action) => {
        if (!action.payload) return
        const { dbid, queries } = action.payload

        state.queryDict[dbid] = queries
      }),
      builder.addCase(deleteQueryFromStores.fulfilled, (state, action) => {
        if (!action.payload) return
        const { dbid, queries } = action.payload

        state.queryDict[dbid] = queries
      })
  },
})

export const {
  setDatabases,
  setFilter,
  setDatabaseSchema,
  setDatabaseVisibility,
  setDatabaseClosed,
  setDatabaseLoading,
  setDatabaseActiveContext,
  removeDatabase,
  setTablePagination,
  setTableFilters,
  setTableSort,
  setQueryPagination,
} = databaseSlice.actions

export const selectDatabases = (state: { database: IDatabaseState }) =>
  state.database.databases

export const selectDatabaseFilters = (state: { database: IDatabaseState }) =>
  state.database.filters

export const selectDatabaseSchemas = (state: { database: IDatabaseState }) =>
  state.database.schemaDict

export const selectDatabaseVisibility = (state: { database: IDatabaseState }) =>
  state.database.visibilityDict

export const selectDatabaseActiveContext = (state: {
  database: IDatabaseState
}) => {
  const activeContext = state.database.activeContext

  if (!activeContext) return undefined

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

export const selectQueries = (
  state: { database: IDatabaseState },
  dbid: string,
) => {
  return state.database.queryDict[dbid]
}

export const selectQuery = (
  state: { database: IDatabaseState },
  dbid: string,
  name: string,
) => {
  return state.database.queryDict[dbid]?.find((query) => query.name === name)
}

export const selectQueryPagination = (
  state: { database: IDatabaseState },
  dbid: string,
  queryName: string,
) => {
  return state.database.queryPaginationDict[dbid]?.[queryName]
}

export default databaseSlice.reducer
