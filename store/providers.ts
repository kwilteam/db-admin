import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsKeys, initIdb } from "@/utils/idb/init"
import {
  IProvider,
  getProviders,
  deleteProvider,
  setProvider,
  getProvider,
} from "@/utils/idb/providers"
import { getSetting, setSetting } from "@/utils/idb/settings"

export enum KwilProviderStatus {
  Unknown,
  Online,
  Offline,
}

interface IProviderState {
  providers: IProvider[] | undefined
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

export const deleteProviderFromStores = createAsyncThunk(
  "providers/deleteProviderFromStores",
  async (provider: string) => {
    const db = await initIdb()
    if (!db) return

    await deleteProvider(db, provider)

    return provider
  },
)

export const saveProviderToStores = createAsyncThunk(
  "providers/saveProvider",
  async ({
    originalProviderName,
    provider,
    connectNow,
  }: {
    originalProviderName: string | undefined
    provider: IProvider
    connectNow: boolean
  }) => {
    let setActiveProvider = false
    const db = await initIdb()
    if (!db) return

    // If we are updating an existing provider, we need to delete the old provider from the IDB if the provider name has changed
    // This is because if we change the name we will duplicate the provider as the name is the key for the IDB table
    if (originalProviderName && originalProviderName !== provider.name) {
      const existingProvider = await getProvider(db, originalProviderName)

      // If the name has been changed
      if (existingProvider && existingProvider.name !== provider.name) {
        // Delete the old version
        await deleteProvider(db, existingProvider.name)

        // And if the provider was the active provider, we need to update the active provider in the settings
        const activeProvider = await getSetting(db, SettingsKeys.PROVIDER)
        if (activeProvider && activeProvider.value === existingProvider.name) {
          setActiveProvider = true
          await setSetting(db, SettingsKeys.PROVIDER, provider.name)
        }
      }
    }

    await setProvider(db, provider)

    if (connectNow) {
      setActiveProvider = true
      // If we are setting this to the active provider, we need to update the active provider in the settings
      await setSetting(db, SettingsKeys.PROVIDER, provider.name)
    }

    const providers = await getProviders(db)

    return {
      providers,
      activeProvider: setActiveProvider ? provider.name : undefined,
    }
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
    }),
      builder.addCase(deleteProviderFromStores.fulfilled, (state, action) => {
        state.providers = state.providers?.filter(
          (provider) => provider.name !== action.payload,
        )
      }),
      builder.addCase(saveProviderToStores.fulfilled, (state, action) => {
        if (!action.payload) return
        const { providers, activeProvider } = action.payload

        if (activeProvider) {
          state.activeProvider = activeProvider
        }

        state.providers = providers
      })
  },
})

export const {} = providersSlice.actions

export const selectProviders = (state: { providers: IProviderState }) =>
  state.providers.providers

export const selectActiveProvider = (state: { providers: IProviderState }) =>
  state.providers.activeProvider

export default providersSlice.reducer
