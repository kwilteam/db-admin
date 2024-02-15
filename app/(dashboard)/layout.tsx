"use client"

import { useEffect } from "react"
import {
  loadActiveAccount,
  selectActiveAccount,
  selectSettingsLoaded,
} from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { loadProviders, selectActiveProvider } from "@/store/providers"
import MobileNavigation from "@/components/Navigation/Mobile"
import DesktopNavigation from "@/components/Navigation/Desktop"
import GlobalAlert from "@/components/GlobalAlert"
import UserAccount from "@/components/UserAccount"
import KwilProviders from "@/components/KwilProviders"
import ConnectWalletModal from "@/components/Modal/ConnectWallet"
import Loading from "@/components/Loading"

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

  return (
    <>
      <>
        <MobileNavigation />
        <div className="flex max-h-mobile min-h-mobile lg:min-h-screen">
          <DesktopNavigation />

          {(!settingsLoaded || !activeProvider) && (
            <div className="flex w-full justify-center pt-4">
              <Loading />
            </div>
          )}

          {settingsLoaded && activeProvider && (
            <div className="flex flex-1 flex-col overflow-scroll lg:pl-16">
              {children}
              <GlobalAlert />
              <div className="absolute right-1 top-1 hidden gap-1 md:flex">
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

      <ConnectWalletModal
        activeAccount={activeAccount}
        settingsLoaded={settingsLoaded}
      />
    </>
  )
}
