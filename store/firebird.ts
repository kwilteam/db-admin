import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IFirebirdAuth {
  email: string | undefined
  context?: "login" | "register"
}

interface IFirebirdAccount {
  email: string | undefined
  token?: string
}

export interface IFirebirdNetworkSettings {
  chainId?: string
  kwilVersion?: string
  companyName?: string
}

export interface IFirebirdNewDeployment {
  network: "testnet" | "mainnet"
  networkSettings: IFirebirdNetworkSettings
  numberOfNodes: number
  vm: "mini" | "small" | "medium" | "large"
  services: {
    daemon: boolean
    gateway: boolean
    indexer: boolean
  }
  finalOptions: {
    // inviteValidators: boolean
    accessCode: string
  }
}

interface IFirebirdState {
  auth: IFirebirdAuth
  account: IFirebirdAccount
  newDeployment: IFirebirdNewDeployment | undefined
  currentStep: number
}

const initialState: IFirebirdState = {
  auth: {
    email: undefined,
  },
  account: {
    email: undefined,
  },
  newDeployment: undefined,
  currentStep: 1,
}

export const firebirdSlice = createSlice({
  name: "firebird",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ email: string; context: "login" | "register" }>,
    ) => {
      state.auth = action.payload
    },

    setAccount: (state, action: PayloadAction<IFirebirdAccount>) => {
      state.account = action.payload
    },

    setNewDeployment: (
      state,
      action: PayloadAction<{
        key: keyof IFirebirdNewDeployment
        value: any
      }>,
    ) => {
      const { key, value } = action.payload

      if (!state.newDeployment) {
        state.newDeployment = {} as IFirebirdNewDeployment
      }

      // TODO: improve typing
      // @ts-ignore-next-line
      state.newDeployment[key] = value
    },

    setNewDeploymentObject: (
      state,
      action: PayloadAction<{
        key: keyof IFirebirdNewDeployment
        propertyKey: keyof IFirebirdNewDeployment[keyof IFirebirdNewDeployment]
        value: any
      }>,
    ) => {
      const { key, propertyKey, value } = action.payload

      if (!state.newDeployment) {
        state.newDeployment = {} as IFirebirdNewDeployment
      }

      if (!state.newDeployment[key]) {
        state.newDeployment[key] = {}
      }

      state.newDeployment[key][propertyKey] = value
    },

    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
  },
})

export const {
  setAccount,
  setNewDeployment,
  setNewDeploymentObject,
  setCurrentStep,
  setAuth,
} = firebirdSlice.actions

export const selectAuth = (state: { firebird: IFirebirdState }) =>
  state.firebird.auth

export const selectAccount = (state: { firebird: IFirebirdState }) =>
  state.firebird.account

export const selectNewDeployment = (state: { firebird: IFirebirdState }) =>
  state.firebird.newDeployment

export const selectCurrentStep = (state: { firebird: IFirebirdState }) =>
  state.firebird.currentStep

export default firebirdSlice.reducer
