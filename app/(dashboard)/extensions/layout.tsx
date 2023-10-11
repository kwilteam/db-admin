import ExtensionsFilters from "@/components/Extensions/Filters"

export default function ExtensionsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row overflow-hidden">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <ExtensionsFilters />
      </div>
      <div className="flex-1 overflow-scroll">{children}</div>
    </div>
  )
}
