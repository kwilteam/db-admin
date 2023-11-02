import { ReduxProvider } from "@/store/Provider"
import MobileNavigation from "@/components/Navigation/Mobile"
import DesktopNavigation from "@/components/Navigation/Desktop"
import { isAdminPkSetup } from "@/utils/admin/setup"
import { redirect } from "next/navigation"

interface IProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: IProps) {
  const privateKeySetup = isAdminPkSetup()

  // If PK is not setup, redirect to setup process
  if (!privateKeySetup) {
    redirect("/setup")
  }

  return (
    <ReduxProvider>
      <MobileNavigation />

      <div className="flex max-h-mobile min-h-mobile lg:min-h-screen">
        <DesktopNavigation />

        <div className="flex flex-1 flex-col overflow-scroll lg:pl-16">
          {children}
        </div>
      </div>
    </ReduxProvider>
  )
}
