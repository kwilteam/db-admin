import { useCallback, useState } from "react"
import * as monaco from "monaco-editor"
import { compileSchema } from "@/utils/server-actions"
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

export default function useCompileDatabase(
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | undefined>,
) {
  const dispatch = useAppDispatch()
  const [isCompiling, setIsCompiling] = useState(false)
  const kwilProvider = useKwilProvider()
  const kwilSigner = useKwilSigner()
  const providerStatus = useAppSelector(selectProviderStatus)

  const exportJson = useCallback(async () => {
    if(!editorRef.current) return

    setIsCompiling(true)

    const schema = editorRef.current.getValue()

    try {
      // Compile the code
      const compiledSchema = await compileSchema(schema)
      const blob = new Blob(
        [JSON.stringify(compiledSchema)],
        { type: "application/json" }
      )

      // Create a URL and download the file
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = compiledSchema.name + ".json"
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
    } finally {
      setIsCompiling(false)
    }
  }, [editorRef, dispatch]);

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

    const schema = editorRef.current.getValue()

    try {
      // Compile the code
      const compiledSchema = await compileSchema(schema)

      if (compiledSchema) {
        const deployBody = {
          schema: compiledSchema,
          description: "Deployed from Kwil Browser",
        }

        await kwilProvider?.deploy(deployBody, kwilSigner, true)

        dispatch(
          setAlert({
            type: "success",
            text: "Database deployed successfully!",
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

  return { deploy, isCompiling, exportJson }
}
