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
import { IParseKuneiform, IParseRes, IWasmExec } from "@/lib/kuneiform/types"
import "@/wasm/wasm_exec"
// @ts-ignore - string is built during the build process
import { wasmHex } from "@/wasm/wasmString"


interface GlobalThis {
  parseKuneiform: (schema: string) => Promise<IWasmExec>
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
  const providerStatus = useAppSelector(selectProviderStatus)
  const [parseKuneiform, setParseKuneiform] = useState<IParseKuneiform | null>(null)

  useEffect(() => {
    async function init() {
      // Instantiate the WebAssembly module
      const go = new globalThis.Go()
      const wasmBuffer = Buffer.from(wasmHex, 'hex').buffer
      const buffer = new Uint8Array(wasmBuffer)
      const result: WebAssembly.WebAssemblyInstantiatedSource = await WebAssembly.instantiate(buffer, go.importObject)
      go.run(result.instance)

      const parseKf = async (schema: string) => {
        const res = await globalThis.parseKuneiform(schema)
        // console.log(res)
        console.log({
          ...res,
          json: res.json ? JSON.parse(res.json) : res.json
        })
        // TODO: Remove res.json !== "" once we are confident that unhandled errors are cleaned up in KF.
        if (!res.json && res.json !== "") {
        // if(!res.json) {
          dispatch(
            setAlert({
              type: "error",
              text: "Failed to parse database definition.",
            }),
          )
          console.log('in failure block')
          throw new Error(`Failed to parse database definition. Response: ${res.toString()}`)
        }
        return JSON.parse(res.json) as IParseRes
      }

      setParseKuneiform(() => parseKf);
    }

    init()
  }, [wasmHex])

  const exportJson = useCallback(async () => {
    if (!editorRef.current) return
    if (!parseKuneiform) return

    setIsCompiling(true)

    const inputs = editorRef.current.getValue()

    try {
      // Compile the code
      const { schema, parse_errs } = await parseKuneiform(inputs)

      if(parse_errs) {
        for (const error of parse_errs) {
          const msg = `Error: ${error.parser_name} - ${error.message} at ${error.position.start_line}:${error.position.start_col}`
          const err = new Error(msg)
          const errorMessage = getDetailsErrorMessage(err)

          dispatch(
            setAlert({
              type: "error",
              text: errorMessage || "An error occurred",
            }),
          )

          return
        }
      }

      const blob = new Blob(
        [JSON.stringify(schema)],
        { type: "application/json" }
      )

      // Create a URL and download the file
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      const name = schema?.name || "database"
      a.download = name + ".json"
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
  }, [editorRef, dispatch, parseKuneiform]);

  const deploy = useCallback(async () => {
    if (!editorRef.current) return
    if (!parseKuneiform) return

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

    const inputs = editorRef.current.getValue()

    try {
      // Compile the code
      const { schema, parse_errs } = await parseKuneiform(inputs)

      if(parse_errs) {
        for (const error of parse_errs) {
          const msg = `Error: ${error.parser_name} - ${error.message} at ${error.position.start_line}:${error.position.start_col}`
          const err = new Error(msg)
          const errorMessage = getDetailsErrorMessage(err)

          dispatch(
            setAlert({
              type: "error",
              text: errorMessage || "An error occurred",
            }),
          )

          return
        }
      }

      if (schema) {
        const deployBody = {
          schema,
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
  }, [editorRef, dispatch, kwilProvider, kwilSigner, providerStatus, parseKuneiform])

  return { deploy, isCompiling, exportJson, parseKuneiform }
}
