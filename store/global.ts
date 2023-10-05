import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IGlobalState {
  isMenuOpen: boolean
  // currentUser: string | null
}

const initialState: IGlobalState = {
  isMenuOpen: false,
  // currentUser: null,
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload
    },
    // setCurrentUser: (state, action) => {
    //   state.currentUser = action.payload
    // },
  },
})

export const { setIsMenuOpen } = globalSlice.actions

export const selectIsMenuOpen = (state: { global: IGlobalState }) =>
  state.global.isMenuOpen

export default globalSlice.reducer
