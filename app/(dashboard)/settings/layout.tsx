import SettingsNavigation from "@/components/Settings/Navigation"

export default function SettingsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <div className="w-full bg-white">
          <SettingsNavigation />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
