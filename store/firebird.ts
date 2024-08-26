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
  customBinary: boolean
}

export interface IFirebirdFinalOptions {
  inviteValidators?: boolean
  accessCode: string
}

export enum MachineType {
  mini = "mini",
  small = "small",
  medium = "medium",
  large = "large",
}

export interface IFirebirdMachines {
  type: MachineType
  provider: "aws"
  region: "us-east-2"
}

export interface IFirebirdNewDeployment {
  network: "testnet" | "mainnet"
  networkSettings: IFirebirdNetworkSettings
  nodeCount: number
  machines: IFirebirdMachines
  services: IFirebirdServices | undefined
  finalOptions: IFirebirdFinalOptions
  currentStep: number
  talkWithTeamModal: boolean
}

interface IFirebirdState {
  authEmail: string | undefined
  account: IFirebirdAccount | undefined
  newDeployment: IFirebirdNewDeployment | undefined
}

const initialState: IFirebirdState = {
  authEmail: undefined,
  account: undefined,
  newDeployment: undefined,
}

export const firebirdSlice = createSlice({
  name: "firebird",
  initialState,
  reducers: {
    setAuthEmail: (state, action: PayloadAction<string>) => {
      state.authEmail = action.payload
    },

    setAccount: (
      state,
      action: PayloadAction<IFirebirdAccount | undefined>,
    ) => {
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

    setNewDeploymentFinalOptions: (
      state,
      action: PayloadAction<{
        key: keyof IFirebirdFinalOptions
        value: IFirebirdFinalOptions[keyof IFirebirdFinalOptions]
      }>,
    ) => {
      const { key, value } = action.payload

      if (!state.newDeployment) {
        state.newDeployment = {} as IFirebirdNewDeployment
      }

      if (!state.newDeployment.finalOptions) {
        state.newDeployment.finalOptions = {} as IFirebirdFinalOptions
      }

      state.newDeployment.finalOptions = {
        ...state.newDeployment.finalOptions,
        [key]: value,
      }
    },

    cancelNewDeployment: (state) => {
      state.newDeployment = undefined
    },

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
  setNewDeploymentFinalOptions,
  cancelNewDeployment,
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
