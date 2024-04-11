"use server"

import fs from "fs"
import path from "path"
import '../wasm/wasm_exec'
import { CompiledKuneiform } from "@kwilteam/kwil-js/dist/core/payload"
import { headers } from "next/headers"

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

  // 1. Load the Go runtime
  const go = new globalThis.Go()
  const wasmPath = path.resolve(process.cwd(), "wasm", "kl.wasm")
  console.log('WASM PATH', wasmPath)
  const wasm = fs.readFileSync(wasmPath)
  const wasmBuffer = Buffer.from(wasm)
  const buffer = new Uint8Array(wasmBuffer)

  // const head = headers()
  // // local dev is http, prod is https
  // const url = `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${head.get('host')}/wasm/kl.wasm`
  // const response = await fetch(url)
  // const buffer = await response.arrayBuffer()
  // 2. Instantiate the WebAssembly module
  const result: WebAssembly.WebAssemblyInstantiatedSource = await WebAssembly.instantiate(buffer, go.importObject);
  go.run(result.instance)

  // 3. Parse the schema
  const kuneiformSchema = await globalThis.parseKuneiform(schema)

  console.log("Compilation time:", Date.now() - startTime, "ms")

  if(!kuneiformSchema.json) {
    throw new Error(
      kuneiformSchema.error || "Failed to parse database definition"
    )
  }

  return JSON.parse(kuneiformSchema.json) as CompiledKuneiform
}
