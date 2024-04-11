"use server"

import fs from "fs"
import path from "path"
import '../public/wasm/wasm_exec.js'
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

  // 1. Load the Go runtime
  const go = new globalThis.Go()
  // const wasmPath = path.resolve(__dirname, "public", "wasm", "kl.wasm")
  // console.log('WASM PATH', wasmPath)
  // const wasm = fs.readFileSync(wasmPath)
  // const wasmBuffer = Buffer.from(wasm)
  // const typedArray = new Uint8Array(wasmBuffer)

  const head = headers()
  console.log('HEADERS', head.get('host'))
  // local dev is http, prod is https
  console.log("ENVIRONMENT", process.env.NODE_ENV)
  // const url = `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${head.get('host')}/wasm/kl.wasm`
  const url = "https://db-admin-8rdj9wwt1-kwillukes-projects.vercel.app/wasm/kl.wasm"
  console.log('URL', url)
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  // 2. Instantiate the WebAssembly module
  const result: WebAssembly.WebAssemblyInstantiatedSource = await WebAssembly.instantiate(buffer, go.importObject);
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
