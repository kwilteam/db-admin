import Ide from "@/components/Ide"
import { getFiles } from "@/utils/files"

export default async function CreatePage() {
  const templates = await getFiles("templates")
  const savedFiles = await getFiles("saved")

  return <Ide templates={templates} savedFiles={savedFiles} />
}
