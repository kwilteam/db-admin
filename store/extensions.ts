import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IKwilExtension {
  id: number
  name: string
  publisher: string
  verified: string
  official: string
  image: string
  description: string
  readme: string
  installation?: string
  gitUrl?: string
  dockerUrl?: string
}

export interface IExtensionFilter {
  search: string
  verified: string
  official: string
}

interface IExtensionsState {
  extensions: IKwilExtension[]
  filters: IExtensionFilter
  loading: boolean
}

const initialState: IExtensionsState = {
  extensions: [],
  filters: {
    search: "",
    official: "",
    verified: "",
  },
  loading: true,
}

export const extensionsSlice = createSlice({
  name: "extensions",
  initialState,
  reducers: {
    setExtensions: (state, action: PayloadAction<IKwilExtension[]>) => {
      state.extensions = action.payload
    },
    setFilters: (state, action: PayloadAction<IExtensionFilter>) => {
      state.filters = action.payload
    },
    setFilterValue: (
      state,
      action: PayloadAction<{
        key: keyof IExtensionFilter
        value: string
      }>,
    ) => {
      const { key, value } = action.payload

      state.filters[key] = value
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setExtensions, setFilters, setFilterValue, setLoading } =
  extensionsSlice.actions

export const selectExtensions = (state: { extensions: IExtensionsState }) =>
  state.extensions.extensions

export const selectFilters = (state: { extensions: IExtensionsState }) =>
  state.extensions.filters

export const selectLoading = (state: { extensions: IExtensionsState }) =>
  state.extensions.loading

export default extensionsSlice.reducer
