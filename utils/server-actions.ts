"use server"

export const loginAction = (formData: FormData) => {
  const email = formData.get("email")
  console.log(email)

  console.log("loginAction")
}

// import '../wasm/wasm_exec'
// import { CompiledKuneiform } from "@kwilteam/kwil-js/dist/core/payload"
// // @ts-ignore - string is built during the build process
// import { wasmHex } from "../wasm/wasmString"

// interface IParseRes {
//   schema: CompiledKuneiform;
// }

// interface IStringifiedParse {
//   json: string
// }

// interface GlobalThis {
//   parseKuneiform: (schema: string) => Promise<IStringifiedParse>
//   Go: any
// }

// declare const globalThis: GlobalThis

// export async function compileSchema(
//   schema: string,
// ): Promise<CompiledKuneiform> {
//   const startTime = Date.now()

//   // // 1. Load the Go runtime
//   const go = new globalThis.Go()
//   const wasmBuffer = Buffer.from(wasmHex, 'hex').buffer
//   const buffer = new Uint8Array(wasmBuffer)

//   // // 2. Instantiate the WebAssembly module
//   const result: WebAssembly.WebAssemblyInstantiatedSource = await WebAssembly.instantiate(buffer, go.importObject);
//   go.run(result.instance)

//   // // 3. Parse the schema
//   const { json } = await globalThis.parseKuneiform(schema)
//   const parseRes = JSON.parse(json);

//   console.log("Compilation time:", Date.now() - startTime, "ms")

//   console.log("kuneiformSchema", kuneiformSchema)
//   if(!kuneiformSchema.json) {
//     throw new Error(
//       kuneiformSchema.error || "Failed to parse database definition"
//     )
//   }

//   return JSON.parse(kuneiformSchema.json) as CompiledKuneiform
// }
