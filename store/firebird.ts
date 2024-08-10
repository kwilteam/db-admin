import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IFirebirdAccount {
  email: string | undefined
  token?: string
}

interface IFirebirdState {
  account: IFirebirdAccount
}

const initialState: IFirebirdState = {
  account: {
    email: undefined,
  },
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
  },
})

export const { setAccount } = firebirdSlice.actions

export const selectAccount = (state: { firebird: IFirebirdState }) =>
  state.firebird.account

export default firebirdSlice.reducer
