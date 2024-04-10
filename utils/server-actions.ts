"use server"

import fs from "fs"
import path from "path"
import '../wasm/wasm_exec.js'
import { CompiledKuneiform } from "@kwilteam/kwil-js/dist/core/payload"

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

  // 1. Load the Go runtime
  const go = new globalThis.Go()
  const wasmPath = path.join(process.cwd(), "wasm", "kl.wasm")
  const wasm = fs.readFileSync(wasmPath)
  const wasmBuffer = Buffer.from(wasm)
  const typedArray = new Uint8Array(wasmBuffer)

  // 2. Instantiate the WebAssembly module
  const result: WebAssembly.WebAssemblyInstantiatedSource = await WebAssembly.instantiate(typedArray, go.importObject);
  go.run(result.instance)

  // 3. Parse the schema
  const kuneiformSchema = await globalThis.parseKuneiform(schema)

  if(!kuneiformSchema.json) {
    throw new Error(
      kuneiformSchema.error || "Failed to parse database definition"
    )
  }

  return JSON.parse(kuneiformSchema.json) as CompiledKuneiform
}
