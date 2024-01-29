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
  const [provider, setProvider] = useState<IKwilProvider | undefined>()

  useEffect(() => {
    if (!activeProvider) return

    const _provider = providers?.find((p) => p.name === activeProvider)

    if (!_provider) throw new Error("Failed to find provider")

    setProvider(_provider)
  }, [activeProvider, providers])

  useEffect(() => {
    if (!provider) return

    const init = async () => {
      try {
        const _readOnlyKwilProvider = new WebKwil({
          kwilProvider: provider.url,
          chainId: "",
          logging: true, // TODO: enable logging, default false
        })

        const { data } = await _readOnlyKwilProvider.chainInfo()

        const chainId = data?.chain_id

        if (!chainId) throw new Error("Failed to fetch chain ID")

        const _writeKwilProvider = new WebKwil({
          kwilProvider: provider.url,
          chainId,
          logging: true, // enable logging, default false
        })

        setReadOnlyKwilProvider(_readOnlyKwilProvider)
        setWriteKwilProvider(_writeKwilProvider)
      } catch (error) {
        console.log("Failed to initialize kwil provider", error)
        setReadOnlyKwilProvider(undefined)
        setWriteKwilProvider(undefined)
      }
    }

    init()
  }, [provider])

  return { readOnlyKwilProvider, writeKwilProvider }
}
