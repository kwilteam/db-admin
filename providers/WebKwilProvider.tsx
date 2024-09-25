"use client"

import {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react"
import { WebKwil } from "@kwilteam/kwil-js"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  KwilProviderStatus,
  selectActiveProviderObject,
} from "@/store/providers"
import {
  ModalEnum,
  setModal,
  setProviderOfflineAcknowledged,
  setProviderStatus,
  setCheckProviderStatus,
  selectCheckProviderStatus,
} from "@/store/global"

const logging = true

const KwilContext = createContext<WebKwil | undefined>(undefined)

export const WebKwilProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const dispatch = useAppDispatch()
  const [kwilProvider, setKwilProvider] = useState<WebKwil | undefined>()
  const activeProviderObject = useAppSelector(selectActiveProviderObject)
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const checkProviderStatusFlag = useAppSelector(selectCheckProviderStatus)

  const handleProviderOffline = useCallback(() => {
    setKwilProvider(undefined)
    setIsOnline(false)
    dispatch(setProviderStatus(KwilProviderStatus.Offline))
    dispatch(setModal(ModalEnum.PROVIDER_OFFLINE))
  }, [dispatch])

  const initKwilProvider = useCallback(async () => {
    if (!activeProviderObject || !isOnline) return

    try {
      const kwilProviderOptions = {
        kwilProvider: activeProviderObject.url,
        chainId: activeProviderObject.chainId || "",
        logging,
      }

      let kwilInstance = new WebKwil(kwilProviderOptions)

      if (!activeProviderObject.chainId) {
        const { data } = await kwilInstance.chainInfo()
        kwilProviderOptions.chainId = data?.chain_id || ""
        kwilInstance = new WebKwil(kwilProviderOptions)
      }

      setKwilProvider(kwilInstance)
    } catch (error) {
      setKwilProvider(undefined)
      dispatch(setProviderStatus(KwilProviderStatus.Offline))
      dispatch(setModal(ModalEnum.PROVIDER_OFFLINE))
      console.error("Failed to initialize kwil provider", error)
    }
  }, [dispatch, activeProviderObject, isOnline])

  useEffect(() => {
    initKwilProvider()
  }, [initKwilProvider])

  const checkProviderStatus = useCallback(async () => {
    if (!activeProviderObject) return

    const tempProvider = new WebKwil({
      kwilProvider: activeProviderObject.url,
      chainId: activeProviderObject.chainId || "",
      logging,
    }) // Create a new instance to check the provider status

    try {
      const ping = await tempProvider.ping()

      if (ping.status === 200) {
        setIsOnline(true)
        dispatch(setProviderStatus(KwilProviderStatus.Online))
        dispatch(setModal(undefined))
        dispatch(setProviderOfflineAcknowledged(false))
      } else {
        handleProviderOffline()
      }
    } catch (error) {
      handleProviderOffline()
    }
  }, [activeProviderObject, dispatch, handleProviderOffline])

  // The provider status can be checked by setting the checkProviderStatusFlag to true
  // This is so we can check the provider status even when the provider has not changed
  useEffect(() => {
    if (checkProviderStatusFlag) {
      checkProviderStatus()
      dispatch(setCheckProviderStatus(false)) // Reset the flag after checking
    }
  }, [checkProviderStatusFlag, checkProviderStatus, dispatch])

  // If the active provider changes, we should check the provider status
  useEffect(() => {
    if (activeProviderObject) {
      checkProviderStatus()
    }
  }, [activeProviderObject, checkProviderStatus])

  return (
    <KwilContext.Provider value={kwilProvider}>{children}</KwilContext.Provider>
  )
}

export const useKwilProvider = () => useContext(KwilContext)
