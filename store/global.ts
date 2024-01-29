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

interface ISettings {
  provider: string | undefined
  account: string | undefined
}

interface IGlobalState {
  isMenuOpen: boolean
  settings: ISettings
  settingsLoaded: boolean
  alert: IAlert | undefined
}

const initialState: IGlobalState = {
  isMenuOpen: true,
  settings: {
    provider: undefined,
    account: undefined,
  },
  settingsLoaded: false,
  alert: undefined,
}

export const loadSettings = createAsyncThunk("ide/loadSettings", async () => {
  const db = await initIdb()
  if (!db) return

  const { value: provider } = await getSetting(db, SettingsKeys.PROVIDER)
  const { value: account } = await getSetting(db, SettingsKeys.ACCOUNT)

  return { provider, account }
})

export const saveSetting = createAsyncThunk(
  "ide/saveSetting",
  async (settings: { key: SettingsKeys; value: string | undefined }) => {
    const db = await initIdb()
    if (!db) return

    const { key, value } = settings

    await setSetting(db, key, value)

    return { key, value }
  },
)

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload
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
    builder.addCase(loadSettings.fulfilled, (state, action) => {
      if (!action.payload) return
      const { provider, account } = action.payload
      state.settings.provider = provider
      state.settings.account = account
      state.settingsLoaded = true
    }),
      builder.addCase(saveSetting.fulfilled, (state, action) => {
        if (!action.payload) return
        const { key, value } = action.payload
        if (key === SettingsKeys.PROVIDER) {
          state.settings.provider = value
        } else if (key === SettingsKeys.ACCOUNT) {
          state.settings.account = value
        }
      })
  },
})

export const { setIsMenuOpen, setSettingsLoaded } = globalSlice.actions

export const selectIsMenuOpen = (state: { global: IGlobalState }) =>
  state.global.isMenuOpen

export const selectSettings = (state: { global: IGlobalState }) =>
  state.global.settings

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
