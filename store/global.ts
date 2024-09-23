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
  TALK_WITH_TEAM = "TALK_WITH_TEAM",
  PROVIDER_OFFLINE = "PROVIDER_OFFLINE",
  CONNECT = "CONNECT",
  SAVE_QUERY = "SAVE_QUERY",
  DELETE_DEPLOYMENT = "DELETE_DEPLOYMENT",
  DELETE_NODE = "DELETE_NODE",
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
  checkProviderStatus: boolean
}

const initialState: IGlobalState = {
  isMenuOpen: false,
  modal: undefined,
  activeAccount: undefined,
  providerStatus: KwilProviderStatus.Unknown,
  providerOfflineAcknowledged: false,
  settingsLoaded: false,
  alert: undefined,
  modalData: undefined,
  checkProviderStatus: false,
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
    setCheckProviderStatus: (state, action: PayloadAction<boolean>) => {
      state.checkProviderStatus = action.payload
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
  setCheckProviderStatus,
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

export const selectCheckProviderStatus = (state: { global: IGlobalState }) =>
  state.global.checkProviderStatus

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
