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

  // const { activeProvider } = useAppSelector(selectActiveProvider)

  useEffect(() => {
    const init = async () => {
      const _readOnlyKwilProvider = new WebKwil({
        kwilProvider: "http://localhost:8080",
        chainId: "",
        logging: true, // TODO: enable logging, default false
      })

      const { data } = await _readOnlyKwilProvider.chainInfo()

      const chainId = data?.chain_id

      if (!chainId) throw new Error("Failed to fetch chain ID")

      const _writeKwilProvider = new WebKwil({
        kwilProvider: "http://localhost:8080",
        chainId,
        logging: true, // enable logging, default false
      })

      setReadOnlyKwilProvider(_readOnlyKwilProvider)
      setWriteKwilProvider(_writeKwilProvider)
    }

    init()
  }, [])

  return { readOnlyKwilProvider, writeKwilProvider }
}
