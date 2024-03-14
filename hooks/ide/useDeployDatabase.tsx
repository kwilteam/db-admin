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
import { useKwilSigner } from "@/hooks/kwil/useKwilSigner"
import { KwilProviderStatus } from "@/store/providers"
import { useKwilProvider } from "@/providers/WebKwilProvider"

export default function useDeployDatabase(
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | undefined>,
) {
  const dispatch = useAppDispatch()
  const [isDeploying, setIsDeploying] = useState(false)
  const kwilProvider = useKwilProvider()
  const kwilSigner = useKwilSigner()
  const providerStatus = useAppSelector(selectProviderStatus)

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

    setIsDeploying(true)

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
      setIsDeploying(false)
    }
  }, [editorRef, dispatch, kwilProvider, kwilSigner, providerStatus])

  return { deploy, isDeploying }
}
