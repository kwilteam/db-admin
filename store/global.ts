import { IAccountJwt } from "@/utils/admin-db/token"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IGlobalState {
  isMenuOpen: boolean
  currentUser: IAccountJwt | undefined
}

const initialState: IGlobalState = {
  isMenuOpen: false,
  currentUser: undefined,
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload
    },
    setCurrentUser: (state, action: PayloadAction<IAccountJwt>) => {
      state.currentUser = action.payload
    },
  },
})

export const { setIsMenuOpen, setCurrentUser } = globalSlice.actions

export const selectIsMenuOpen = (state: { global: IGlobalState }) =>
  state.global.isMenuOpen

export const selectCurrentUser = (state: { global: IGlobalState }) =>
  state.global.currentUser

export default globalSlice.reducer
