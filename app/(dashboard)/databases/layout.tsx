import DatabasesExplorer from "@/components/DatabaseExplorer"

export default function DatabasesLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex min-h-screen flex-row">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <DatabasesExplorer />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
