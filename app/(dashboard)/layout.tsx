"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  loadSettingsFromIdb,
  selectCurrentAccount,
  selectCurrentProvider,
} from "@/store/global"
import MobileNavigation from "@/components/Navigation/Mobile"
import DesktopNavigation from "@/components/Navigation/Desktop"
import GlobalAlert from "@/components/GlobalAlert"
import UserAccount from "@/components/UserAccount"
import KwilProviders from "@/components/KwilProviders"
import ConnectWalletDialog from "@/components/ConnectWalletDialog"
import { useEffect } from "react"

interface IProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: IProps) {
  const dispatch = useAppDispatch()
  const currentProvider = useAppSelector(selectCurrentProvider)
  const currentAccount = useAppSelector(selectCurrentAccount)

  useEffect(() => {
    dispatch(loadSettingsFromIdb())
  }, [dispatch])

  return (
    <>
      <>
        {currentAccount && <MobileNavigation />}
        <div className="flex max-h-mobile min-h-mobile lg:min-h-screen">
          <DesktopNavigation />

          {currentAccount && currentProvider && (
            <div className="flex flex-1 flex-col overflow-scroll lg:pl-16">
              {children}
              <GlobalAlert />
              <div className="absolute right-0 top-0 z-50 hidden gap-2 rounded-bl-md border border-t-0 border-kwil/20 bg-white p-2 drop-shadow-md md:flex">
                <KwilProviders
                  currentProvider={currentProvider}
                  className="hidden lg:flex"
                />
                <UserAccount
                  currentAccount={currentAccount}
                  className="hidden lg:flex"
                />
              </div>
            </div>
          )}
        </div>
      </>
      {!currentAccount && <ConnectWalletDialog />}
    </>
  )
}
