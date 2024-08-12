import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IFirebirdAccount {
  email: string | undefined
  token?: string
}

export interface IFirebirdNewDeployment {
  network: "testnet" | "mainnet"
  networkSettings: {
    chainId: number
    kwilVersion: string
    companyName: string
  }
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
  talkWithTeam: boolean
}

interface IFirebirdState {
  account: IFirebirdAccount
  newDeployment: IFirebirdNewDeployment | undefined
}

const initialState: IFirebirdState = {
  account: {
    email: undefined,
  },
  newDeployment: undefined,
}

export const firebirdSlice = createSlice({
  name: "firebird",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<IFirebirdAccount>) => {
      const { email, token } = action.payload

      if (email) {
        state.account.email = email
      }

      if (token) {
        state.account.token = token
      }
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

      state.newDeployment[key] = value
    },
  },
})

export const { setAccount, setNewDeployment } = firebirdSlice.actions

export const selectAccount = (state: { firebird: IFirebirdState }) =>
  state.firebird.account

export const selectNewDeployment = (state: { firebird: IFirebirdState }) =>
  state.firebird.newDeployment

export default firebirdSlice.reducer
