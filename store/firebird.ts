import {
  IFirebirdAccount,
  IFirebirdApiNode,
  IFirebirdDeployment,
  IFirebirdFinalOptions,
  IFirebirdNetworkSettings,
  IFirebirdNewDeployment,
  IFirebirdServices,
  KwilVersions,
  MachineType,
  Network,
} from "@/utils/firebird/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
export type KwilVersion = keyof typeof KwilVersions

interface IFirebirdState {
  authEmail: string | undefined
  account: IFirebirdAccount | undefined
  newDeployment: IFirebirdNewDeployment | undefined
  deployments: IFirebirdDeployment[] | undefined
  selectedDeployment: IFirebirdDeployment | undefined
  deploymentNodes:
    | { deploymentId: string; nodes: IFirebirdApiNode[] }[]
    | undefined

  displayProviderConnectionModal: boolean | undefined
}

const initialNewDeployment: IFirebirdNewDeployment = {
  network: Network.testnet,
  networkSettings: {
    chainId: undefined,
    kwilVersion: KwilVersions["0.9.3"],
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
  talkWithTeam: false,
}

const initialState: IFirebirdState = {
  authEmail: undefined,
  account: undefined,
  newDeployment: initialNewDeployment,
  deployments: undefined,
  selectedDeployment: undefined,
  deploymentNodes: undefined,
  displayProviderConnectionModal: false,
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

    resetNewDeployment: (state) => {
      state.newDeployment = initialNewDeployment
    },

    setTalkWithTeam: (state, action: PayloadAction<boolean>) => {
      if (!state.newDeployment) {
        state.newDeployment = {} as IFirebirdNewDeployment
      }

      state.newDeployment.talkWithTeam = action.payload
    },

    setSelectedDeployment: (
      state,
      action: PayloadAction<IFirebirdDeployment | undefined>,
    ) => {
      state.selectedDeployment = action.payload
    },

    setDeploymentNodes: (
      state,
      action: PayloadAction<{
        deploymentId: string
        nodes: IFirebirdApiNode[]
      }>,
    ) => {
      const { deploymentId, nodes } = action.payload

      if (!state.deploymentNodes) {
        state.deploymentNodes = []
      }

      const existingIndex = state.deploymentNodes.findIndex(
        (item) => item.deploymentId === deploymentId,
      )

      if (existingIndex !== -1) {
        state.deploymentNodes[existingIndex].nodes = nodes
      } else {
        state.deploymentNodes.push({ deploymentId, nodes })
      }
    },

    deleteDeploymentNode: (
      state,
      action: PayloadAction<{ deploymentId: string; nodeId: string }>,
    ) => {
      const { deploymentId, nodeId } = action.payload

      if (!state.deploymentNodes) return

      const deploymentIndex = state.deploymentNodes.findIndex(
        (item) => item.deploymentId === deploymentId,
      )

      if (deploymentIndex !== -1) {
        state.deploymentNodes[deploymentIndex].nodes = state.deploymentNodes[
          deploymentIndex
        ].nodes.filter((node) => node.id !== nodeId)
      }
    },

    setDisplayProviderConnectionModal: (
      state,
      action: PayloadAction<boolean | undefined>,
    ) => {
      state.displayProviderConnectionModal = action.payload
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
  resetNewDeployment,
  setAuthEmail,
  setTalkWithTeam,
  setSelectedDeployment,
  setDeploymentNodes,
  deleteDeploymentNode,
  setDisplayProviderConnectionModal,
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

export const selectSelectedDeployment = (state: { firebird: IFirebirdState }) =>
  state.firebird.selectedDeployment

export const selectDeploymentNodesById =
  (deploymentId: string) => (state: { firebird: IFirebirdState }) =>
    state.firebird.deploymentNodes?.find(
      (item) => item.deploymentId === deploymentId,
    )?.nodes

export const selectDeploymentById =
  (deploymentId: string | undefined) =>
  (state: { firebird: IFirebirdState }) => {
    if (!deploymentId) return undefined

    return state.firebird.deployments?.find(
      (deployment) => deployment.id === deploymentId,
    )
  }

export const selectDisplayProviderConnectionModal = (state: {
  firebird: IFirebirdState
}) => state.firebird.displayProviderConnectionModal

export default firebirdSlice.reducer
