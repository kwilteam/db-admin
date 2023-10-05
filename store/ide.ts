import { getSchemaContent, getSavedSchemas } from "@/utils/api"
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface IIdeState {
  savedSchemas: string[] | undefined
  openSchemas: string[]
  activeSchema: string
  schemaContentDict: { [schema: string]: string }
}

const initialState: IIdeState = {
  savedSchemas: undefined,
  openSchemas: [],
  activeSchema: "",
  schemaContentDict: {},
}

export const loadSchema = createAsyncThunk(
  "ide/loadSchema",
  async (schemaName: string) => {
    const schemaContent = await getSchemaContent(schemaName)

    return { schemaName, schemaContent }
  },
)

export const loadSavedSchemas = createAsyncThunk(
  "ide/loadSavedSchemas",
  async () => {
    const savedSchemas = await getSavedSchemas()

    return { savedSchemas }
  },
)

export const ideSlice = createSlice({
  name: "ide",
  initialState: initialState,
  reducers: {
    openSchema: (state, action: PayloadAction<string>) => {
      const schemaName = action.payload

      if (!state.openSchemas.includes(schemaName)) {
        state.openSchemas.push(schemaName)
      }

      // If exists then just set as active
      state.activeSchema = action.payload
    },

    closeSchema: (state, action: PayloadAction<string>) => {
      state.openSchemas = state.openSchemas.filter(
        (schema) => schema !== action.payload,
      )

      if (
        state.activeSchema === action.payload &&
        state.openSchemas.length > 0
      ) {
        state.activeSchema = state.openSchemas[0]
      }
    },

    setActiveSchema: (state, action: PayloadAction<string>) => {
      state.activeSchema = action.payload
    },

    addNewSchema: (state, action: PayloadAction<string>) => {
      const schemaName = action.payload

      if (
        !state.openSchemas.includes(schemaName) &&
        state.savedSchemas &&
        !state.savedSchemas.includes(schemaName)
      ) {
        state.openSchemas.push(schemaName)
        state.savedSchemas.push(schemaName)
        state.schemaContentDict[schemaName] = ""
        state.activeSchema = schemaName
      }
    },

    removeSchema: (state, action: PayloadAction<string>) => {
      const schemaName = action.payload

      if (state.openSchemas.includes(schemaName)) {
        state.openSchemas = state.openSchemas.filter(
          (schema) => schema !== schemaName,
        )
      }

      if (state.savedSchemas && state.savedSchemas.includes(schemaName)) {
        state.savedSchemas = state.savedSchemas.filter(
          (schema) => schema !== schemaName,
        )
      }

      if (state.activeSchema === schemaName) {
        state.activeSchema = state.openSchemas[0]
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadSchema.fulfilled, (state, action) => {
      if (state.schemaContentDict[action.payload.schemaName]) return

      state.schemaContentDict[action.payload.schemaName] =
        action.payload.schemaContent
    }),
      builder.addCase(loadSavedSchemas.fulfilled, (state, action) => {
        const { savedSchemas } = action.payload
        if ((state.savedSchemas && state.savedSchemas.length) || !savedSchemas)
          return

        state.savedSchemas = savedSchemas
      })
  },
})

export const {
  openSchema,
  closeSchema,
  setActiveSchema,
  addNewSchema,
  removeSchema,
} = ideSlice.actions

export const selectSavedSchemas = (state: { ide: IIdeState }) =>
  state.ide.savedSchemas

export const selectOpenSchemas = (state: { ide: IIdeState }) =>
  state.ide.openSchemas

export const selectActiveSchema = (state: { ide: IIdeState }) =>
  state.ide.activeSchema

export const selectSchemaContentDict = (state: { ide: IIdeState }) => {
  return state.ide.schemaContentDict
}

export default ideSlice.reducer
