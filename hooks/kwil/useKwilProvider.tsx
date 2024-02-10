import { useCallback, useEffect, useState } from "react"
import { WebKwil } from "@kwilteam/kwil-js"
import { IProvider } from "@/utils/idb/providers"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectActiveProvider, selectProviders } from "@/store/providers"

const logging = true

export const useKwilProvider = (): WebKwil | undefined => {
  const dispatch = useAppDispatch()
  const [kwilProvider, setKwilProvider] = useState<WebKwil | undefined>()
  const activeProvider = useAppSelector(selectActiveProvider)
  const providers = useAppSelector(selectProviders)
  const [providerObject, setProviderObject] = useState<IProvider | undefined>()

  // Use the active provider to find the provider object from the list of providers in the LocalStorage
  useEffect(() => {
    if (!activeProvider) return

    const _provider = providers?.find((p) => p.name === activeProvider)

    if (!_provider) {
      setProviderObject(undefined)
      return
    }

    setProviderObject(_provider)
  }, [activeProvider, providers, dispatch])

  const initKwilProvider = useCallback(async () => {
    if (!providerObject) return

    if (!providerObject.chainId) {
      const readOnlyKwilProvider = new WebKwil({
        kwilProvider: providerObject.url,
        chainId: "",
        logging,
      })

      const { data } = await readOnlyKwilProvider.chainInfo()

      const chainId = data?.chain_id

      // Only initialize the write provider if we have a chainId
      if (chainId) {
        const writeKwilProvider = new WebKwil({
          kwilProvider: providerObject.url,
          chainId,
          logging, // enable logging, default false
        })

        setKwilProvider(writeKwilProvider)
      } else {
        setKwilProvider(readOnlyKwilProvider)
      }
    } else {
      const _kwilProvider = new WebKwil({
        kwilProvider: providerObject.url,
        chainId: providerObject.chainId,
        logging,
      })

      setKwilProvider(_kwilProvider)
    }
  }, [providerObject])

  useEffect(() => {
    if (!providerObject) return

    const init = async () => {
      try {
        await initKwilProvider()
      } catch (error) {
        setKwilProvider(undefined)

        console.error("Failed to initialize kwil provider", error)
      }
    }

    init()
  }, [providerObject, initKwilProvider])

  return kwilProvider
}
