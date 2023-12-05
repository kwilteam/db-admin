import { IAlertType } from "@/components/Alert"
import { IAccountJwt } from "@/utils/admin/token"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IAlert {
  text: string
  type: IAlertType
  position?: "top" | "bottom"
}

interface IGlobalState {
  isMenuOpen: boolean
  currentUser: IAccountJwt | undefined
  alert: IAlert | undefined
}

const initialState: IGlobalState = {
  isMenuOpen: true,
  currentUser: undefined,
  alert: undefined,
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
    setAlert: (state, action: PayloadAction<IAlert | undefined>) => {
      state.alert = action.payload
    },
  },
})

export const { setIsMenuOpen, setCurrentUser, setAlert } = globalSlice.actions

export const selectIsMenuOpen = (state: { global: IGlobalState }) =>
  state.global.isMenuOpen

export const selectCurrentUser = (state: { global: IGlobalState }) =>
  state.global.currentUser

export const selectAlert = (state: { global: IGlobalState }) =>
  state.global.alert

export default globalSlice.reducer
