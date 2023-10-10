import { ReduxProvider } from "@/store/Provider"
import MobileNavigation from "@/components/Navigation/Mobile"
import DesktopNavigation from "@/components/Navigation/Desktop"

interface IProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: IProps) {
  return (
    <ReduxProvider>
      <MobileNavigation />

      <div className="max-h-mobile min-h-mobile flex lg:min-h-screen">
        <DesktopNavigation />

        <div className="flex flex-1 flex-col overflow-scroll lg:pl-16">
          {children}
        </div>
      </div>
    </ReduxProvider>
  )
}
