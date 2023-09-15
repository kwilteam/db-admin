import DatabasesExplorer from "@/components/DatabaseExplorer"
import { getDatabases } from "@/util/api"

export default async function DatabasesLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const databases = await getDatabases()

  return (
    <div className="flex min-h-screen flex-row">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        {databases && <DatabasesExplorer databases={databases} />}
        {!databases && (
          <div className="w-full p-2 text-center text-sm">
            No databases exist
          </div>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
