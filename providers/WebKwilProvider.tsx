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
  const pathname = usePathname()
  const [kwilProvider, setKwilProvider] = useState<WebKwil | undefined>()
  const activeProvider = useAppSelector(selectActiveProvider)
  const providers = useAppSelector(selectProviders)
  const [providerObject, setProviderObject] = useState<IProvider | undefined>()
  const [isOnline, setIsOnline] = useState<boolean>(false)
  const checkProviderStatusFlag = useAppSelector(selectCheckProviderStatus)

  useEffect(() => {
    if (!activeProvider) return

    const _provider = providers?.find((p) => p.name === activeProvider)

    setProviderObject(_provider || undefined)
  }, [activeProvider, providers, pathname])

  const initKwilProvider = useCallback(async () => {
    if (!providerObject || !isOnline) return
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
    } catch (error) {
      setKwilProvider(undefined)
      dispatch(setProviderStatus(KwilProviderStatus.Offline))
      dispatch(setModal(ModalEnum.PROVIDER_OFFLINE))
      console.error("Failed to initialize kwil provider", error)
    }
  }, [dispatch, providerObject, isOnline])

  // From Martin: By including the pathname we re-evaluate the Kwil provider whenever the route changes
  // This makes it possible to test the provider status whenever there is a significant user action
  // Allowing us to notify the user when the provider is offline

  // From Luke: The problem with using pathname in the initKwilProvider dependency array is that it will re-trigger database calls on every route change (including switching tables, actions, etc.). This is not ideal because it creates a brief and unnecessary reload on the database page. Instead, we should move the ping check to a separate useEffect that only runs when the pathname changes, and then we can check the provider status there.
  useEffect(() => {
    initKwilProvider()
  }, [initKwilProvider])

  const checkProviderStatus = useCallback(async () => {
    if (!providerObject) return
    const tempProvider = new WebKwil({
      kwilProvider: providerObject.url,
      chainId: providerObject.chainId || "",
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
        setIsOnline(false)
        setKwilProvider(undefined)
        dispatch(setProviderStatus(KwilProviderStatus.Offline))
        dispatch(setModal(ModalEnum.PROVIDER_OFFLINE))
      }
    } catch (error) {
      setIsOnline(false)
      setKwilProvider(undefined)
      dispatch(setProviderStatus(KwilProviderStatus.Offline))
      dispatch(setModal(ModalEnum.PROVIDER_OFFLINE))
      console.error("Failed to check provider status", error)
    }
  }, [providerObject])

  // useEffect(() => {
  //   checkProviderStatus()
  // }, [pathname, checkProviderStatus])

  useEffect(() => {
    if (checkProviderStatusFlag) {
      checkProviderStatus()
      dispatch(setCheckProviderStatus(false)) // Reset the flag after checking
    }
  }, [checkProviderStatusFlag, checkProviderStatus, dispatch])

  return (
    <KwilContext.Provider value={kwilProvider}>{children}</KwilContext.Provider>
  )
}

export const useKwilProvider = () => useContext(KwilContext)
