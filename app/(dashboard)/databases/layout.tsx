import DatabaseExplorer from "@/components/DatabaseExplorer"

export default function DatabasesLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <DatabaseExplorer />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
