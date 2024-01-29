import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsKeys, initIdb } from "@/utils/idb/init"
import { IProvider, getProviders } from "@/utils/idb/providers"
import { getSetting, setSetting } from "@/utils/idb/settings"

export enum KwilProviderStatus {
  Unknown,
  Online,
  Offline,
}

// Status is not persisted in the IDB only in the store
export interface IKwilProvider extends IProvider {
  status?: KwilProviderStatus
}

interface IProviderState {
  providers: IKwilProvider[] | undefined
  activeProvider: string | undefined
}

const initialState: IProviderState = {
  providers: [],
  activeProvider: undefined,
}

export const loadProviders = createAsyncThunk(
  "providers/loadProviders",
  async () => {
    const db = await initIdb()
    if (!db) return

    const providers = await getProviders(db)

    const activeProvider = await getSetting(db, SettingsKeys.PROVIDER)

    return { providers, activeProvider: activeProvider?.value }
  },
)

export const saveActiveProvider = createAsyncThunk(
  "providers/saveActiveProvider",
  async (provider: string | undefined) => {
    const db = await initIdb()
    if (!db) return

    await setSetting(db, SettingsKeys.PROVIDER, provider)

    return provider
  },
)

export const providersSlice = createSlice({
  name: "providers",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loadProviders.fulfilled, (state, action) => {
      if (!action.payload) return
      const { providers, activeProvider } = action.payload

      state.activeProvider = activeProvider
      state.providers = providers
    })

    builder.addCase(saveActiveProvider.fulfilled, (state, action) => {
      state.activeProvider = action.payload
    })
  },
})

export const {} = providersSlice.actions

export const selectProviders = (state: { providers: IProviderState }) =>
  state.providers.providers

export const selectActiveProvider = (state: { providers: IProviderState }) =>
  state.providers.activeProvider

export default providersSlice.reducer
