"use client"

import { useAppSelector } from "@/store/hooks"
import { selectCurrentAccount } from "@/store/global"
import MobileNavigation from "@/components/Navigation/Mobile"
import DesktopNavigation from "@/components/Navigation/Desktop"
import GlobalAlert from "@/components/GlobalAlert"
import UserAccount from "@/components/UserAccount"
import KwilProvider from "@/components/KwilProvider"
import ConnectWalletDialog from "@/components/ConnectWalletDialog"

interface IProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: IProps) {
  const account = useAppSelector(selectCurrentAccount)

  return (
    <>
      <>
        {account && <MobileNavigation />}
        <div className="flex max-h-mobile min-h-mobile lg:min-h-screen">
          <DesktopNavigation />

          {account && (
            <div className="flex flex-1 flex-col overflow-scroll lg:pl-16">
              {children}
              <GlobalAlert />
              <div className="absolute right-0 top-0 z-50 hidden gap-2 rounded-bl-md border border-t-0 border-kwil/20 bg-white p-2 drop-shadow-md md:flex">
                <KwilProvider className="hidden lg:flex" />
                <UserAccount account={account} className="hidden lg:flex" />
              </div>
            </div>
          )}
        </div>
      </>
      {!account && <ConnectWalletDialog />}
    </>
  )
}
