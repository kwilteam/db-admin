import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IFirebirdAccount {
  email: string | undefined
  token?: string
}

export interface IFirebirdNetworkSettings {
  chainId?: string
  kwilVersion?: string
  companyName?: string
}

export interface IFirebirdServices {
  daemon: boolean
  gateway: boolean
  indexer: boolean
}

export interface IFirebirdFinalOptions {
  inviteValidators?: boolean
  accessCode: string
}

export interface IFirebirdNewDeployment {
  network: "testnet" | "mainnet"
  networkSettings: IFirebirdNetworkSettings
  numberOfNodes: number
  vm: "mini" | "small" | "medium" | "large"
  services: IFirebirdServices
  finalOptions: IFirebirdFinalOptions
  currentStep: number
  talkWithTeamModal: boolean
}

interface IFirebirdState {
  authEmail: string | undefined
  account: IFirebirdAccount
  newDeployment: IFirebirdNewDeployment | undefined
}

const initialState: IFirebirdState = {
  authEmail: undefined,
  account: {
    email: undefined,
  },
  newDeployment: undefined,
}

export const firebirdSlice = createSlice({
  name: "firebird",
  initialState,
  reducers: {
    setAuthEmail: (state, action: PayloadAction<string>) => {
      state.authEmail = action.payload
    },

    setAccount: (state, action: PayloadAction<IFirebirdAccount>) => {
      state.account = action.payload
    },

    setNewDeployment: (
      state,
      action: PayloadAction<{
        key: keyof IFirebirdNewDeployment
        value: IFirebirdNewDeployment[keyof IFirebirdNewDeployment]
      }>,
    ) => {
      const { key, value } = action.payload

      if (!state.newDeployment) {
        state.newDeployment = {} as IFirebirdNewDeployment
      }

      state.newDeployment = {
        ...state.newDeployment,
        [key]: value,
      }
    },

    setNewDeploymentNetworkSettings: (
      state,
      action: PayloadAction<{
        key: keyof IFirebirdNetworkSettings
        value: IFirebirdNetworkSettings[keyof IFirebirdNetworkSettings]
      }>,
    ) => {
      const { key, value } = action.payload

      if (!state.newDeployment) {
        state.newDeployment = {} as IFirebirdNewDeployment
      }

      if (!state.newDeployment.networkSettings) {
        state.newDeployment.networkSettings = {} as IFirebirdNetworkSettings
      }

      state.newDeployment.networkSettings[key] = value
    },
    //   state,
    //   action: PayloadAction<{
    //     parentKey: keyof IFirebirdNewDeployment | undefined
    //     propertyKey: keyof IFirebirdNewDeployment[keyof IFirebirdNewDeployment]
    //     value: any
    //   }>,
    // ) => {
    //   const { parentKey, propertyKey, value } = action.payload

    //   if (!state.newDeployment) {
    //     state.newDeployment = {} as IFirebirdNewDeployment
    //   }

    //   if (!parentKey) {
    //     state.newDeployment[propertyKey] = value
    //   } else {
    //     if (!state.newDeployment[parentKey]) {
    //       state.newDeployment[parentKey] = {}
    //     }

    //     state.newDeployment[parentKey][propertyKey] = value
    //   }
    // },

    setCurrentStep: (state, action: PayloadAction<number>) => {
      if (!state.newDeployment) {
        state.newDeployment = {} as IFirebirdNewDeployment
      }

      state.newDeployment.currentStep = action.payload
    },

    setTalkWithTeamModal: (state, action: PayloadAction<boolean>) => {
      if (!state.newDeployment) {
        state.newDeployment = {} as IFirebirdNewDeployment
      }

      state.newDeployment.talkWithTeamModal = action.payload
    },
  },
})

export const {
  setAccount,
  setNewDeployment,
  setNewDeploymentNetworkSettings,
  setAuthEmail,
  setCurrentStep,
  setTalkWithTeamModal,
} = firebirdSlice.actions

export const selectAuthEmail = (state: { firebird: IFirebirdState }) =>
  state.firebird.authEmail

export const selectAccount = (state: { firebird: IFirebirdState }) =>
  state.firebird.account

export const selectNewDeployment = (state: { firebird: IFirebirdState }) =>
  state.firebird.newDeployment

export const selectCurrentStep = (state: { firebird: IFirebirdState }) =>
  state.firebird.newDeployment?.currentStep ?? 1

export const selectTalkWithTeamModal = (state: { firebird: IFirebirdState }) =>
  state.firebird.newDeployment?.talkWithTeamModal

export default firebirdSlice.reducer
