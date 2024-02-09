import { IAlertType } from "@/components/Alert"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "."
import { SettingsKeys, initIdb } from "@/utils/idb/init"
import { getSetting, setSetting } from "@/utils/idb/settings"

interface IAlert {
  text: string
  type: IAlertType
  position?: "top" | "bottom"
}

interface IGlobalState {
  isMenuOpen: boolean
  readOnlyMode: boolean
  activeAccount: string | undefined
  settingsLoaded: boolean
  alert: IAlert | undefined
}

const initialState: IGlobalState = {
  isMenuOpen: true,
  readOnlyMode: false,
  activeAccount: undefined,
  settingsLoaded: false,
  alert: undefined,
}

export const loadActiveAccount = createAsyncThunk(
  "ide/loadActiveAccount",
  async () => {
    const db = await initIdb()
    if (!db) return

    const accountSetting = await getSetting(db, SettingsKeys.ACCOUNT)

    return accountSetting?.value
  },
)

export const saveActiveAccount = createAsyncThunk(
  "ide/saveActiveAccount",
  async (account: string | undefined) => {
    const db = await initIdb()
    if (!db) return

    await setSetting(db, SettingsKeys.ACCOUNT, account)

    return account
  },
)

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload
    },
    setReadOnlyMode: (state, action: PayloadAction<boolean>) => {
      state.readOnlyMode = action.payload
    },
    setSettingsLoaded: (state, action: PayloadAction<boolean>) => {
      state.settingsLoaded = action.payload
    },
    setAlertStart: (state, action: PayloadAction<IAlert>) => {
      state.alert = action.payload
    },
    setAlertEnd: (state) => {
      state.alert = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadActiveAccount.fulfilled, (state, action) => {
      state.activeAccount = action.payload
      state.settingsLoaded = true
    }),
      builder.addCase(saveActiveAccount.fulfilled, (state, action) => {
        state.activeAccount = action.payload
      })
  },
})

export const { setIsMenuOpen, setReadOnlyMode, setSettingsLoaded } =
  globalSlice.actions

export const selectIsMenuOpen = (state: { global: IGlobalState }) =>
  state.global.isMenuOpen

export const selectReadOnlyMode = (state: { global: IGlobalState }) =>
  state.global.readOnlyMode

export const selectActiveAccount = (state: { global: IGlobalState }) =>
  state.global.activeAccount

export const selectSettingsLoaded = (state: { global: IGlobalState }) =>
  state.global.settingsLoaded

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
