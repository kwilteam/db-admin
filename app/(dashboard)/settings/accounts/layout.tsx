import SettingsNavigation from "@/components/Settings/Navigation"

export default function AccountsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
      {children}
    </div>
  )
}
