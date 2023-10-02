import Ide from "@/components/Ide"
import SchemaExplorer from "@/components/Ide/SchemaExplorer"
import { getSavedSchemas } from "@/utils/files"

export default async function CreatePage() {
  const savedSchemas = await getSavedSchemas()

  return (
    <div className="flex flex-row overflow-hidden">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <SchemaExplorer savedSchemas={savedSchemas} />
      </div>
      <div className="flex-1 overflow-hidden">
        <Ide />
      </div>
    </div>
  )
}
