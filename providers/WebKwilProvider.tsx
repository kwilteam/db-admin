"use client"

import {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react"
import { usePathname } from "next/navigation"
import { WebKwil } from "@kwilteam/kwil-js"
import { IProvider } from "@/utils/idb/providers"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  KwilProviderStatus,
  selectActiveProvider,
  selectProviders,
} from "@/store/providers"
import { ModalEnum, setModal, setProviderOfflineAcknowledged, setProviderStatus } from "@/store/global"

const logging = true

const KwilContext = createContext<WebKwil | undefined>(undefined)

export const WebKwilProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const [kwilProvider, setKwilProvider] = useState<WebKwil | undefined>()
  const activeProvider = useAppSelector(selectActiveProvider)
  const providers = useAppSelector(selectProviders)
  const [providerObject, setProviderObject] = useState<IProvider | undefined>()

  useEffect(() => {
    if (!activeProvider) return

    const _provider = providers?.find((p) => p.name === activeProvider)

    setProviderObject(_provider || undefined)
  }, [activeProvider, providers, pathname])

  const initKwilProvider = useCallback(async () => {
    if (!providerObject) return

    try {
      const kwilProviderOptions = {
        kwilProvider: providerObject.url,
        chainId: providerObject.chainId || "",
        logging,
      }

      let kwilInstance = new WebKwil(kwilProviderOptions)

      if (!providerObject.chainId) {
        const { data } = await kwilInstance.chainInfo()
        kwilProviderOptions.chainId = data?.chain_id || ""
        kwilInstance = new WebKwil(kwilProviderOptions)
      }

      const ping = await kwilInstance.ping()

      if (ping.status === 200) {
        setKwilProvider(kwilInstance)
        dispatch(setProviderStatus(KwilProviderStatus.Online))
        dispatch(setModal(undefined))
        dispatch(setProviderOfflineAcknowledged(false))
      } else {
        setKwilProvider(undefined)
        dispatch(setProviderStatus(KwilProviderStatus.Offline))
        dispatch(setModal(ModalEnum.PROVIDER_OFFLINE))
        
      }
    } catch (error) {
      setKwilProvider(undefined)
      dispatch(setProviderStatus(KwilProviderStatus.Offline))
      dispatch(setModal(ModalEnum.PROVIDER_OFFLINE))
      console.error("Failed to initialize kwil provider", error)
    }
  }, [dispatch, providerObject])

  // By including the pathname we re-evaluate the Kwil provider whenever the route changes
  // This makes it possible to test the provider status whenever there is a significant user action
  // Allowing us to notify the user when the provider is offline
  useEffect(() => {
    initKwilProvider()
  }, [initKwilProvider, pathname])

  return (
    <KwilContext.Provider value={kwilProvider}>{children}</KwilContext.Provider>
  )
}

export const useKwilProvider = () => useContext(KwilContext)
