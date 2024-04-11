import fs from 'fs'
import path from 'path'
import decompress from 'decompress'

const kfPath = "https://github.com/kwilteam/kuneiform/releases/download/v0.6.1/kuneiform_wasm.tar.gz"
const outputDir = path.join(process.cwd(), 'tmp');
const outputTsFilePath = path.join(process.cwd(), 'wasm', 'wasmString.ts')
const wasmFileName = './wasm/kuneiform.wasm'
const tempTarGzFilePath = path.join(process.cwd(), 'temp.tar.gz');

if (fs.existsSync(outputTsFilePath)) {
    fs.unlinkSync(outputTsFilePath);
}

fetch(kfPath)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to fetch ${kfPath}: ${response.statusText}`);
        }

        console.log(`Fetched Kuneiform from ${kfPath}`);
        return response.arrayBuffer();
    })
    .then((arrayBuffer) => {
        // Write the buffer to a temporary file
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(tempTarGzFilePath, buffer);

        // Decompress the .tar.gz file
        return decompress(tempTarGzFilePath, outputDir, {
            filter: file => file.path === wasmFileName
        });
    })
    .then((files) => {
        if (files.length === 0) {
            throw new Error(`${wasmFileName} not found in the tarball`);
        }
        const wasmBuffer = files[0].data;

        // Convert the buffer to a base64 string
        const base64Wasm = wasmBuffer.toString('base64');

        // Write the base64 string to a TypeScript file
        const tsContent = `export const wasmb64 = "${base64Wasm}";\n`;
        fs.writeFileSync(outputTsFilePath, tsContent);

        console.log(`TypeScript file written to ${outputTsFilePath}`);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
    .finally(() => {
        // Remove the temporary file
        fs.unlinkSync(tempTarGzFilePath);

        // remove the wasm file
        fs.rmSync(outputDir, { recursive: true});
    });