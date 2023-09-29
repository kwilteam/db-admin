import fs from "fs"
import path from "path"

export async function getFiles(directory: string) {
  const dir = path.join(process.cwd(), `schema/${directory}`)
  const files = await fs.promises.readdir(dir)
  const templates = files
    .filter((file) => path.extname(file) === ".kf")
    .map((file) => path.basename(file, ".kf"))
  return templates
}
