"use client"

import {
  loadActiveAccount,
  selectActiveAccount,
  selectSettingsLoaded,
} from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import MobileNavigation from "@/components/Navigation/Mobile"
import DesktopNavigation from "@/components/Navigation/Desktop"
import GlobalAlert from "@/components/GlobalAlert"
import UserAccount from "@/components/UserAccount"
import KwilProviders from "@/components/KwilProviders"
import ConnectWalletDialog from "@/components/ConnectWalletDialog"
import { useEffect } from "react"
import { loadProviders, selectActiveProvider } from "@/store/providers"

interface IProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: IProps) {
  const dispatch = useAppDispatch()
  const activeAccount = useAppSelector(selectActiveAccount)
  const activeProvider = useAppSelector(selectActiveProvider)
  const settingsLoaded = useAppSelector(selectSettingsLoaded)

  useEffect(() => {
    dispatch(loadActiveAccount())
    dispatch(loadProviders())
  }, [dispatch])

  // Set document title to current provider
  useEffect(() => {
    if (activeProvider) {
      document.title = `KwilDB Admin | ${activeProvider}`
    }
  }, [activeProvider])

  return (
    <>
      <>
        {activeAccount && <MobileNavigation />}
        <div className="flex max-h-mobile min-h-mobile lg:min-h-screen">
          <DesktopNavigation />

          {activeAccount && activeProvider && (
            <div className="flex flex-1 flex-col overflow-scroll lg:pl-16">
              {children}
              <GlobalAlert />
              <div className="absolute right-0 top-0 z-50 hidden gap-2 rounded-bl-md border border-t-0 border-kwil/20 bg-white p-2 drop-shadow-md md:flex">
                <KwilProviders
                  activeProvider={activeProvider}
                  className="hidden lg:flex"
                />
                <UserAccount
                  activeAccount={activeAccount}
                  className="hidden lg:flex"
                />
              </div>
            </div>
          )}
        </div>
      </>

      <ConnectWalletDialog
        activeAccount={activeAccount}
        settingsLoaded={settingsLoaded}
      />
    </>
  )
}
