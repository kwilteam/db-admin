import { IAlertType } from "@/components/Alert"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "."
import { SettingsKeys, initIdb } from "@/utils/idb/init"
import { getSetting } from "@/utils/idb/settings"

interface IAlert {
  text: string
  type: IAlertType
  position?: "top" | "bottom"
}

interface IGlobalState {
  isMenuOpen: boolean
  currentAccount?: string
  currentProvider?: string
  alert: IAlert | undefined
}

const initialState: IGlobalState = {
  isMenuOpen: true,
  currentAccount: undefined,
  currentProvider: undefined,
  alert: undefined,
}

export const loadSettingsFromIdb = createAsyncThunk(
  "ide/loadSettingsFromIdb",
  async () => {
    const db = await initIdb()
    if (!db) return

    const { value: currentProvider } = await getSetting(
      db,
      SettingsKeys.PROVIDER,
    )
    const { value: currentAccount } = await getSetting(db, SettingsKeys.ACCOUNT)

    return { currentProvider, currentAccount }
  },
)

// export const loadProvidersFromIdb = createAsyncThunk(
//   "ide/loadProvidersFromIdb",
//   async () => {
//     const db = await initIdb()
//     if (!db) return

//     const providers = await db.getAll(StoreNames.PROVIDER)

//     return providers
//   },
// )

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
    setCurrentProvider: (state, action: PayloadAction<string | undefined>) => {
      state.currentProvider = action.payload
    },
    setAlertStart: (state, action: PayloadAction<IAlert>) => {
      state.alert = action.payload
    },
    setAlertEnd: (state) => {
      state.alert = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSettingsFromIdb.fulfilled, (state, action) => {
      if (!action.payload) return
      const { currentProvider, currentAccount } = action.payload

      state.currentProvider = currentProvider
      state.currentAccount = currentAccount
    })
  },
})

export const { setIsMenuOpen, setCurrentAccount, setCurrentProvider } =
  globalSlice.actions

export const selectIsMenuOpen = (state: { global: IGlobalState }) =>
  state.global.isMenuOpen

export const selectCurrentAccount = (state: { global: IGlobalState }) =>
  state.global.currentAccount

export const selectCurrentProvider = (state: { global: IGlobalState }) =>
  state.global.currentProvider

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
