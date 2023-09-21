import {
  IDatabaseStructureDict,
  IDatabaseVisibilityDict,
  KwilTypes,
} from "@/utils/database-types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface DatabaseState {
  databaseStructureDict: IDatabaseStructureDict | undefined
  databaseVisibilityDict: IDatabaseVisibilityDict
}

const initialState: DatabaseState = {
  databaseStructureDict: undefined,
  databaseVisibilityDict: {},
}

export const databaseSlice = createSlice({
  name: "database",
  initialState: initialState,
  reducers: {
    setDatabases: (
      state: DatabaseState,
      action: PayloadAction<IDatabaseStructureDict>,
    ) => {
      state.databaseStructureDict = action.payload
    },

    setDatabaseObject: (
      state: DatabaseState,
      action: PayloadAction<{
        database: string
        structure: KwilTypes.Database<string>
      }>,
    ) => {
      if (!state.databaseStructureDict) state.databaseStructureDict = {}

      state.databaseStructureDict[action.payload.database] =
        action.payload.structure
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

export const { setDatabases, setDatabaseObject, setDatabaseVisibility } =
  databaseSlice.actions

export const selectDatabaseStructures = (state: { database: DatabaseState }) =>
  state.database.databaseStructureDict

export const selectDatabaseVisibility = (state: { database: DatabaseState }) =>
  state.database.databaseVisibilityDict

export const selectAction = (
  state: { database: DatabaseState },
  database: string,
  actionName: string,
) => {
  const actions = state.database.databaseStructureDict?.[database]?.actions

  if (!actions) return undefined

  return actions.find((action) => action.name === actionName)
}

export default databaseSlice.reducer
