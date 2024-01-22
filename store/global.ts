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
  // currentUser: IAccountJwt | undefined
  alert: IAlert | undefined
}

const initialState: IGlobalState = {
  isMenuOpen: true,
  // currentUser: undefined,
  alert: undefined,
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload
    },
    // setCurrentUser: (state, action: PayloadAction<IAccountJwt>) => {
    //   state.currentUser = action.payload
    // },
    setAlertStart: (state, action: PayloadAction<IAlert>) => {
      state.alert = action.payload
    },
    setAlertEnd: (state) => {
      state.alert = undefined
    },
  },
})

export const { setIsMenuOpen } = globalSlice.actions

export const selectIsMenuOpen = (state: { global: IGlobalState }) =>
  state.global.isMenuOpen

// export const selectCurrentUser = (state: { global: IGlobalState }) =>
//   state.global.currentUser

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
      }, 4000)
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
