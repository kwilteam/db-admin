"use client"

import {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react"
import { WebKwil } from "@kwilteam/kwil-js"
import { IProvider } from "@/utils/idb/providers"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  KwilProviderStatus,
  selectActiveProvider,
  selectProviders,
} from "@/store/providers"
import { ModalEnum, setModal, setProviderStatus } from "@/store/global"

const logging = true

const KwilContext = createContext<WebKwil | undefined>(undefined)

export const WebKwilProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const dispatch = useAppDispatch()
  const [kwilProvider, setKwilProvider] = useState<WebKwil | undefined>()
  const activeProvider = useAppSelector(selectActiveProvider)
  const providers = useAppSelector(selectProviders)
  const [providerObject, setProviderObject] = useState<IProvider | undefined>()

  useEffect(() => {
    if (!activeProvider) return

    const _provider = providers?.find((p) => p.name === activeProvider)

    setProviderObject(_provider || undefined)
  }, [activeProvider, providers])

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

      setKwilProvider(kwilInstance)
      dispatch(setProviderStatus(KwilProviderStatus.Online))
    } catch (error) {
      dispatch(setProviderStatus(KwilProviderStatus.Offline))
      dispatch(setModal(ModalEnum.PROVIDER_OFFLINE))
      console.error("Failed to initialize kwil provider", error)
    }
  }, [dispatch, providerObject])

  useEffect(() => {
    initKwilProvider()
  }, [initKwilProvider])

  return (
    <KwilContext.Provider value={kwilProvider}>{children}</KwilContext.Provider>
  )
}

export const useKwilProvider = () => useContext(KwilContext)
