"use server"

import '../wasm/wasm_exec'
import { CompiledKuneiform } from "@kwilteam/kwil-js/dist/core/payload"
// @ts-ignore - string is built during the build process
import { wasmHex } from "../wasm/wasmString"

interface IParseRes {
  json: string
  error?: string
}

interface GlobalThis {
  parseKuneiform: (schema: string) => Promise<IParseRes>
  Go: any
}

declare const globalThis: GlobalThis

export async function compileSchema(
  schema: string,
): Promise<CompiledKuneiform | undefined> {
  const startTime = Date.now()

  // // 1. Load the Go runtime
  const go = new globalThis.Go()
  const wasmBuffer = Buffer.from(wasmHex, 'hex').buffer
  const buffer = new Uint8Array(wasmBuffer)

  // // 2. Instantiate the WebAssembly module
  const result: WebAssembly.WebAssemblyInstantiatedSource = await WebAssembly.instantiate(buffer, go.importObject);
  go.run(result.instance)

  // // 3. Parse the schema
  const kuneiformSchema = await globalThis.parseKuneiform(schema)

  console.log("Compilation time:", Date.now() - startTime, "ms")

  if(!kuneiformSchema.json) {
    throw new Error(
      kuneiformSchema.error || "Failed to parse database definition"
    )
  }

  return JSON.parse(kuneiformSchema.json) as CompiledKuneiform
}
