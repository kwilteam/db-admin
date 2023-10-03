import Ide from "@/components/Ide"
import SchemaExplorer from "@/components/Ide/SchemaExplorer"

export default async function CreatePage() {
  return (
    <div className="flex flex-row overflow-hidden">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <SchemaExplorer />
      </div>
      <div className="flex-1 overflow-hidden">
        <Ide />
      </div>
    </div>
  )
}
