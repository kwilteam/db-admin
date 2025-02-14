import fs from "fs"
import path from "path"

export async function getSavedSchemas() {
  const dir = path.join(process.cwd(), `schemas`)
  const files = await fs.promises.readdir(dir)
  const templates = files
    .filter((file) => path.extname(file) === ".sql")
    .map((file) => path.basename(file, ".sql"))
  return templates
}

export async function getSchema(name: string) {
  const filePath = path.join(process.cwd(), `schemas`, `${name}.sql`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Schema ${name} not found`)
  }

  const schema = await fs.promises.readFile(filePath, "utf-8")
  return schema
}

export async function saveSchema(name: string, content: string) {
  const dir = path.join(process.cwd(), `schemas`)
  const filePath = path.join(dir, `${name}.sql`)

  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir)
  }

  await fs.promises.writeFile(filePath, content, "utf-8")
}

export async function deleteSchema(name: string) {
  const filePath = path.join(process.cwd(), `schemas`, `${name}.sql`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Schema ${name} not found`)
  }

  await fs.promises.unlink(filePath)
}
