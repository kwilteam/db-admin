import { ReduxProvider } from "@/store/Provider"
import MobileNavigation from "@/components/Navigation/Mobile"
import DesktopNavigation from "@/components/Navigation/Desktop"

interface IProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: IProps) {
  // Check to make sure that the admin PK exists, if it doesn't redirect to setup page

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
