import { getSchemaContent } from "@/utils/api"
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface IdeState {
  schemas: string[]
  activeSchema: string
  schemaContentDict: { [schema: string]: string }
}

const initialState: IdeState = {
  schemas: [],
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

export const ideSlice = createSlice({
  name: "ide",
  initialState: initialState,
  reducers: {
    openSchema: (state, action: PayloadAction<string>) => {
      loadSchema(action.payload)

      if (!state.schemas.includes(action.payload)) {
        state.schemas.push(action.payload)
      }

      state.activeSchema = action.payload
    },

    closeSchema: (state, action: PayloadAction<string>) => {
      state.schemas = state.schemas.filter(
        (schema) => schema !== action.payload,
      )

      if (state.activeSchema === action.payload && state.schemas.length > 0) {
        state.activeSchema = state.schemas[0]
      }
    },

    setActiveSchema: (state, action: PayloadAction<string>) => {
      console.log("setActiveSchema", action.payload)
      state.activeSchema = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSchema.fulfilled, (state, action) => {
      state.schemaContentDict[action.payload.schemaName] =
        action.payload.schemaContent
    })
  },
})

export const { openSchema, closeSchema, setActiveSchema } = ideSlice.actions

export const selectSchemas = (state: { ide: IdeState }) => state.ide.schemas

export const selectActiveSchema = (state: { ide: IdeState }) =>
  state.ide.activeSchema

export const selectSchemaContentDict = (state: { ide: IdeState }) => {
  return state.ide.schemaContentDict
}

export default ideSlice.reducer
