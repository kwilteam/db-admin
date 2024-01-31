import { useAppSelector } from "@/store/hooks"
import {
  IKwilProvider,
  selectActiveProvider,
  selectProviders,
} from "@/store/providers"
import { WebKwil } from "@kwilteam/kwil-js" // or NodeKwil

import { useEffect, useState } from "react"

export const useKwilProvider = (): {
  readOnlyKwilProvider: WebKwil | undefined
  writeKwilProvider: WebKwil | undefined
} => {
  const [writeKwilProvider, setWriteKwilProvider] = useState<
    WebKwil | undefined
  >()
  const [readOnlyKwilProvider, setReadOnlyKwilProvider] = useState<
    WebKwil | undefined
  >()
  const activeProvider = useAppSelector(selectActiveProvider)
  const providers = useAppSelector(selectProviders)
  const [providerObject, setProviderObject] = useState<
    IKwilProvider | undefined
  >()

  // Use the active provider to find the provider object from the list of providers in the LocalStorage
  useEffect(() => {
    if (!activeProvider) return

    const _provider = providers?.find((p) => p.name === activeProvider)

    if (!_provider) throw new Error("Failed to find provider")

    setProviderObject(_provider)
  }, [activeProvider, providers])

  // Once we have the provider object, initialize the kwil providers
  useEffect(() => {
    if (!providerObject) return

    const init = async () => {
      try {
        const _readOnlyKwilProvider = new WebKwil({
          kwilProvider: providerObject.url,
          chainId: "",
          logging: true, // TODO: enable logging, default false
        })

        const { data } = await _readOnlyKwilProvider.chainInfo()

        const chainId = data?.chain_id

        // Only initialize the write provider if we have a chainId
        if (chainId) {
          const _writeKwilProvider = new WebKwil({
            kwilProvider: providerObject.url,
            chainId,
            logging: true, // enable logging, default false
          })

          setReadOnlyKwilProvider(_readOnlyKwilProvider)
          setWriteKwilProvider(_writeKwilProvider)
        }
      } catch (error) {
        console.log("Failed to initialize kwil provider", error)
        setReadOnlyKwilProvider(undefined)
        setWriteKwilProvider(undefined)
      }
    }

    init()
  }, [providerObject])

  return { readOnlyKwilProvider, writeKwilProvider }
}
