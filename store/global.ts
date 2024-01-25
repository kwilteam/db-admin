import { IAlertType } from "@/components/Alert"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "."

interface IAlert {
  text: string
  type: IAlertType
  position?: "top" | "bottom"
}

interface IGlobalState {
  isMenuOpen: boolean
  currentAccount?: string
  alert: IAlert | undefined
}

const initialState: IGlobalState = {
  isMenuOpen: true,
  currentAccount: undefined,
  alert: undefined,
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload
    },
    setCurrentAccount: (state, action: PayloadAction<string | undefined>) => {
      state.currentAccount = action.payload
    },
    setAlertStart: (state, action: PayloadAction<IAlert>) => {
      state.alert = action.payload
    },
    setAlertEnd: (state) => {
      state.alert = undefined
    },
  },
})

export const { setIsMenuOpen, setCurrentAccount } = globalSlice.actions

export const selectIsMenuOpen = (state: { global: IGlobalState }) =>
  state.global.isMenuOpen

export const selectCurrentAccount = (state: { global: IGlobalState }) =>
  state.global.currentAccount

export const selectAlert = (state: { global: IGlobalState }) =>
  state.global.alert

export default globalSlice.reducer

export const setAlert =
  (alert: IAlert, autoHide: boolean = true) =>
  (dispatch: AppDispatch) => {
    dispatch(setAlertStart(alert))

    if (autoHide) {
      setTimeout(() => {
        dispatch(setAlertEnd())
      }, 5000)
    }
  }

const setAlertStart = (alert: IAlert): PayloadAction<IAlert> => ({
  type: "global/setAlertStart",
  payload: alert,
})

const setAlertEnd = (): PayloadAction<undefined> => ({
  type: "global/setAlertEnd",
  payload: undefined,
})
