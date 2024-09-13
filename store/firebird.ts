import { IFirebirdAccount, IFirebirdDeployment } from "@/utils/firebird/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

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

export enum Network {
  testnet = "testnet",
  mainnet = "mainnet",
}

export enum MachineType {
  mini = "mini",
  small = "small",
  medium = "medium",
  large = "large",
}

export const KwilVersions = {
  "0.8.4": "0.8.4",
} as const

export type KwilVersion = keyof typeof KwilVersions

// export interface IFirebirdMachines {
//   type: MachineType
//   provider: "aws"
//   region: "us-east-2"
// }

export interface IFirebirdNewDeployment {
  network: Network
  networkSettings: IFirebirdNetworkSettings
  nodeCount: number
  machines: MachineType
  services: IFirebirdServices | undefined
  finalOptions: IFirebirdFinalOptions
  talkWithTeam: boolean
}

interface IFirebirdState {
  authEmail: string | undefined
  account: IFirebirdAccount | undefined
  newDeployment: IFirebirdNewDeployment | undefined
  deployments: IFirebirdDeployment[] | undefined
  activeDeployment: IFirebirdDeployment | undefined
  deleteDeploymentId: string | undefined
  providerConnected: boolean | undefined
}

const initialState: IFirebirdState = {
  authEmail: undefined,
  account: undefined,
  newDeployment: {
    network: Network.testnet,
    networkSettings: {
      chainId: undefined,
      kwilVersion: KwilVersions["0.8.4"],
      companyName: undefined,
    },
    nodeCount: 1,
    machines: MachineType.mini,
    services: {
      daemon: true,
      gateway: false,
      indexer: false,
      customBinary: false,
    },
    finalOptions: {
      inviteValidators: undefined,
      accessCode: "",
    },
    talkWithTeam: true,
  },
  deployments: undefined,
  activeDeployment: undefined,
  deleteDeploymentId: undefined,
  providerConnected: undefined,
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

    setDeployments: (
      state,
      action: PayloadAction<IFirebirdDeployment[] | undefined>,
    ) => {
      state.deployments = action.payload
    },

    removeDeployment: (state, action: PayloadAction<string>) => {
      state.deployments = state.deployments?.filter(
        (deployment) => deployment.id !== action.payload,
      )
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

    setNewDeploymentServices: (
      state,
      action: PayloadAction<{
        key: keyof IFirebirdServices
        value: boolean
      }>,
    ) => {
      const { key, value } = action.payload

      if (!state.newDeployment) {
        state.newDeployment = {} as IFirebirdNewDeployment
      }

      if (!state.newDeployment.services) {
        state.newDeployment.services = {} as IFirebirdServices
      }

      state.newDeployment.services[key] = value
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

    setTalkWithTeam: (state, action: PayloadAction<boolean>) => {
      if (!state.newDeployment) {
        state.newDeployment = {} as IFirebirdNewDeployment
      }

      state.newDeployment.talkWithTeam = action.payload
    },

    setActiveDeployment: (
      state,
      action: PayloadAction<IFirebirdDeployment | undefined>,
    ) => {
      state.activeDeployment = action.payload
    },

    setDeleteDeploymentId: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.deleteDeploymentId = action.payload
    },

    setProviderConnected: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      state.providerConnected = action.payload
    },
  },
})

export const {
  setAccount,
  setDeployments,
  removeDeployment,
  setNewDeployment,
  setNewDeploymentNetworkSettings,
  setNewDeploymentServices,
  setNewDeploymentFinalOptions,
  setAuthEmail,
  setTalkWithTeam,
  setActiveDeployment,
  setDeleteDeploymentId,
  setProviderConnected,
} = firebirdSlice.actions

export const selectAuthEmail = (state: { firebird: IFirebirdState }) =>
  state.firebird.authEmail

export const selectAccount = (state: { firebird: IFirebirdState }) =>
  state.firebird.account

export const selectDeployments = (state: { firebird: IFirebirdState }) =>
  state.firebird.deployments

export const selectNewDeployment = (state: { firebird: IFirebirdState }) =>
  state.firebird.newDeployment

export const selectNewDeploymentServices = (state: {
  firebird: IFirebirdState
}) => state.firebird.newDeployment?.services

export const selectTalkWithTeam = (state: { firebird: IFirebirdState }) =>
  state.firebird.newDeployment?.talkWithTeam

export const selectActiveDeployment = (state: { firebird: IFirebirdState }) =>
  state.firebird.activeDeployment

export const selectDeleteDeploymentId = (state: { firebird: IFirebirdState }) =>
  state.firebird.deleteDeploymentId

export const selectProviderConnected = (state: { firebird: IFirebirdState }) =>
  state.firebird.providerConnected

export default firebirdSlice.reducer