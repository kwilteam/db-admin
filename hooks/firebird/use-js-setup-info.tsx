import InlineCode from "@/components/Firebird/InlineCode"
import { useMemo } from "react"

function useJsSetupInfo() {
  return useMemo(
    () => ({
      webInfo: (
        <>
        The {<InlineCode>window.ethereum</InlineCode>} object uses a <a href={'https://metamask.io/'} target="_blank" className="text-sm text-kwil hover:underline">browser wallet</a>. Ensure that your wallet is the DB owner.
        </>
      ),
      nodeInfo: (
        <>
        Replace {<InlineCode>MY_PRIVATE_KEY</InlineCode>} with the private key for the DB owner.
        </>
      ),
    }),
    [],
  )
}

export default useJsSetupInfo
