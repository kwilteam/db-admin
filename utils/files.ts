import fs from "fs"
import path from "path"

export async function getSavedSchemas() {
  const dir = path.join(process.cwd(), `schemas`)
  const files = await fs.promises.readdir(dir)
  const templates = files
    .filter((file) => path.extname(file) === ".kf")
    .map((file) => path.basename(file, ".kf"))
  return templates
}

export async function getSchema(name: string) {
  const filePath = path.join(process.cwd(), `schemas`, `${name}.kf`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Schema ${name} not found`)
  }

  const schema = await fs.promises.readFile(filePath, "utf-8")
  return schema
}
