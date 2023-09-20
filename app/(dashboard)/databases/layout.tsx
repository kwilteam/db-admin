import DatabasesTree from "@/components/DatabaseTree"

export default function DatabasesLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row overflow-hidden">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <DatabasesTree />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
