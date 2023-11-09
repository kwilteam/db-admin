import ExtensionFilters from "@/components/Extensions/Filters"
import ExtensionList from "@/components/Extensions/List"

export default function ExtensionsPage() {
  return (
    <div className="flex flex-row overflow-hidden">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <ExtensionFilters />
      </div>
      <div className="flex-1 overflow-scroll">
        <ExtensionList />
      </div>
    </div>
  )
}
