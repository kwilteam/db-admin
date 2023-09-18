import {
  IDatabaseSchemaDict,
  IDatabaseVisibilityDict,
  KwilTypes,
} from "@/util/database-types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface DatabaseState {
  databaseSchemaDict: IDatabaseSchemaDict | undefined
  databaseVisibilityDict: IDatabaseVisibilityDict
}

const initialState: DatabaseState = {
  databaseSchemaDict: undefined,
  databaseVisibilityDict: {},
}

export const databaseSlice = createSlice({
  name: "database",
  initialState: initialState,
  reducers: {
    setDatabases: (
      state: DatabaseState,
      action: PayloadAction<IDatabaseSchemaDict>,
    ) => {
      state.databaseSchemaDict = action.payload
    },

    setDatabaseSchema: (
      state: DatabaseState,
      action: PayloadAction<{
        database: string
        schema: KwilTypes.Database<string>
      }>,
    ) => {
      console.log("setDatabaseSchema", action.payload)
      if (!state.databaseSchemaDict) state.databaseSchemaDict = {}

      state.databaseSchemaDict[action.payload.database] = action.payload.schema
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
      const currentVisibility = state.databaseVisibilityDict[database]?.[key]
      state.databaseVisibilityDict[database] = {
        ...state.databaseVisibilityDict[database],
        [key]: isVisible !== undefined ? isVisible : !currentVisibility,
      }
    },
  },
})

export const { setDatabases, setDatabaseSchema, setDatabaseVisibility } =
  databaseSlice.actions

export const selectDatabaseSchemas = (state: { database: DatabaseState }) =>
  state.database.databaseSchemaDict

export const selectDatabaseVisibility = (state: { database: DatabaseState }) =>
  state.database.databaseVisibilityDict

export default databaseSlice.reducer
