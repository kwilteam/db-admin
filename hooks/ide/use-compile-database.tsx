import { useCallback, useEffect, useState } from "react"
import * as monaco from "monaco-editor"
import { getDetailsErrorMessage } from "@/utils/error-message"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  ModalEnum,
  selectProviderStatus,
  setAlert,
  setModal,
} from "@/store/global"
import { useKwilSigner } from "@/hooks/use-kwil-signer"
import { KwilProviderStatus } from "@/store/providers"
import { useKwilProvider } from "@/providers/WebKwilProvider"
import { selectActiveSchema } from "@/store/ide"

interface GlobalThis {
  Go: any
}

declare const globalThis: GlobalThis

export default function useCompileDatabase(
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | undefined>,
) {
  const dispatch = useAppDispatch()
  const [isCompiling, setIsCompiling] = useState(false)
  const kwilProvider = useKwilProvider()
  const kwilSigner = useKwilSigner()
  const activeSchema = useAppSelector(selectActiveSchema)
  const providerStatus = useAppSelector(selectProviderStatus)

  const exportSql = useCallback(async () => {
    if (!editorRef.current) return

    const editorText = editorRef.current.getValue()

    try {
      const blob = new Blob(
        [editorText],
        { type: "text/sql" }
      )

      // Create a URL and download the file
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      const name = activeSchema || "database"
      a.download = name + ".sql"
      a.click()

      // Clean up
      URL.revokeObjectURL(url)
      a.remove()
    } catch (error) {
      const errorMessage = getDetailsErrorMessage(error as Error)

      dispatch(
        setAlert({
          type: "error",
          text: errorMessage || "An error occurred",
        }),
      )
    }
  }, [editorRef, dispatch, activeSchema]);

  const deploy = useCallback(async () => {
    if (!editorRef.current) return

    // If the provider is offline then we will show Provider offline modal
    if (providerStatus === KwilProviderStatus.Offline) {
      dispatch(setModal(ModalEnum.PROVIDER_OFFLINE))
      return
    }

    // If no Kwil Signer then we will show the modal to connect the wallet
    if (!kwilSigner) {
      dispatch(setModal(ModalEnum.CONNECT))
      return
    }

    setIsCompiling(true)

    const editorText = editorRef.current.getValue()

    try {
      // Compile the code
      if (editorText) {
        await kwilProvider?.execSql(editorText, {}, kwilSigner, true)

        dispatch(
          setAlert({
            type: "success",
            text: "SQL executed successfully!",
          }),
        )
      } else {
        dispatch(
          setAlert({
            type: "error",
            text: "Nothing to deploy!",
          }),
        )
      }
    } catch (error) {
      const errorMessage = getDetailsErrorMessage(error as Error)

      dispatch(
        setAlert({
          type: "error",
          text: errorMessage || "An error occurred",
        }),
      )
    } finally {
      setIsCompiling(false)
    }
  }, [editorRef, dispatch, kwilProvider, kwilSigner, providerStatus])

  return { deploy, isCompiling, exportSql }
}
