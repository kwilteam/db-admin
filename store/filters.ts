import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IDatabaseFilters {
  includeAll: boolean
  search: string
}

const initialState: IDatabaseFilters = {
  includeAll: true,
  search: "",
}

export const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setSearch: (state: IDatabaseFilters, action: PayloadAction<string>) => {
      state.search = action.payload
    },

    setIncludeAll: (
      state: IDatabaseFilters,
      action: PayloadAction<boolean>,
    ) => {
      state.includeAll = action.payload
    },
  },
})

export const { setSearch, setIncludeAll } = filtersSlice.actions

export const selectSearch = (state: { filters: IDatabaseFilters }) =>
  state.filters.search

export const selectIncludeAll = (state: { filters: IDatabaseFilters }) =>
  state.filters.includeAll

export default filtersSlice.reducer
