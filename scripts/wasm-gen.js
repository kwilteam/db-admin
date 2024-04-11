import fs from 'fs'
import path from 'path'

const wasmPath = path.join(process.cwd(), 'wasm', 'kl.wasm')
const outputPath = path.join(process.cwd(), 'wasm', 'wasmString.ts')

const wasm = fs.readFileSync(wasmPath)

const wasmb64 = wasm.toString('base64')

const tsContent = `export const wasmb64 = "${wasmb64}";\n`;

fs.writeFileSync(outputPath, tsContent)

console.log('WASM file converted to base64 string and saved to wasmString.ts')