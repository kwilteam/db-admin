import { IAlertType } from "@/components/Alert"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "."
import { KwilProviderStatus } from "./providers"

interface IAlert {
  text: string
  type: IAlertType
  position?: "top" | "bottom"
}

export enum ModalEnum {
  TALK_WITH_TEAM = "talk_with_team",
  PROVIDER_OFFLINE = "provider_offline",
  CONNECT = "connect",
  SAVE_QUERY = "save_query",
  DELETE_DEPLOYMENT = "delete_deployment",
  DELETE_NODE = "delete_node",
}

interface IGlobalState {
  isMenuOpen: boolean
  modal: ModalEnum | undefined
  activeAccount: string | undefined
  providerStatus: KwilProviderStatus | undefined
  providerOfflineAcknowledged: boolean
  settingsLoaded: boolean
  alert: IAlert | undefined
  modalData: any
}

const initialState: IGlobalState = {
  isMenuOpen: true,
  modal: undefined,
  activeAccount: undefined,
  providerStatus: KwilProviderStatus.Unknown,
  providerOfflineAcknowledged: false,
  settingsLoaded: false,
  alert: undefined,
  modalData: undefined,
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload
    },
    setModal: (state, action: PayloadAction<ModalEnum | undefined>) => {
      state.modal = action.payload
    },
    setModalData: (state, action: PayloadAction<any>) => {
      state.modalData = action.payload
    },
    setProviderStatus: (state, action: PayloadAction<KwilProviderStatus>) => {
      state.providerStatus = action.payload
    },
    setProviderOfflineAcknowledged: (state, action: PayloadAction<boolean>) => {
      state.providerOfflineAcknowledged = action.payload
    },
    setActiveAccount: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.activeAccount = action.payload.toLowerCase()
      } else {
        state.activeAccount = undefined
      }
    },
    setSettingsLoaded: (state, action: PayloadAction<boolean>) => {
      state.settingsLoaded = action.payload
    },
    setAlertStart: (state, action: PayloadAction<IAlert>) => {
      state.alert = action.payload
    },
    setAlertEnd: (state) => {
      state.alert = undefined
    },
  },
})

export const {
  setIsMenuOpen,
  setModal,
  setModalData,
  setProviderStatus,
  setProviderOfflineAcknowledged,
  setActiveAccount,
  setSettingsLoaded,
} = globalSlice.actions

export const selectIsMenuOpen = (state: { global: IGlobalState }) =>
  state.global.isMenuOpen

export const selectModal = (state: { global: IGlobalState }) =>
  state.global.modal

export const selectModalData = (state: { global: IGlobalState }) =>
  state.global.modalData

export const selectActiveAccount = (state: { global: IGlobalState }) =>
  state.global.activeAccount

export const selectProviderStatus = (state: { global: IGlobalState }) =>
  state.global.providerStatus

export const selectSettingsLoaded = (state: { global: IGlobalState }) =>
  state.global.settingsLoaded

export const selectAlert = (state: { global: IGlobalState }) =>
  state.global.alert

export const selectProviderOfflineAcknowledged = (state: {
  global: IGlobalState
}) => state.global.providerOfflineAcknowledged

export default globalSlice.reducer

export const setAlert =
  (alert: IAlert, hideDelay: number = 5000) =>
  (dispatch: AppDispatch) => {
    dispatch(setAlertStart(alert))

    setTimeout(() => {
      dispatch(setAlertEnd())
    }, hideDelay)
  }

const setAlertStart = (alert: IAlert): PayloadAction<IAlert> => ({
  type: "global/setAlertStart",
  payload: alert,
})

const setAlertEnd = (): PayloadAction<undefined> => ({
  type: "global/setAlertEnd",
  payload: undefined,
})
