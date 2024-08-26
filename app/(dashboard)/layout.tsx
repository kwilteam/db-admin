"use client"

import { useEffect } from "react"
import { selectActiveAccount } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { loadProviders, selectActiveProvider } from "@/store/providers"
import MobileNavigation from "@/components/Navigation/Mobile"
import DesktopNavigation from "@/components/Navigation/Desktop"
import GlobalAlert from "@/components/GlobalAlert"
import UserAccount from "@/components/UserAccount"
import KwilProviders from "@/components/KwilProviders"
import ReadOnlyModal from "@/components/Modal/ReadOnlyModal"
import ProviderOfflineModal from "@/components/Modal/ProviderOffline"
import Loading from "@/components/Loading"
import { KwilFaucet } from "@/components/KwilFaucet"
import { useWindowSize } from "@/hooks/use-window-size"
import FirebirdSignOut from "@/components/Firebird/SignOut"

interface IProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: IProps) {
  const dispatch = useAppDispatch()
  const activeAccount = useAppSelector(selectActiveAccount)
  const activeProvider = useAppSelector(selectActiveProvider)
  const windowSize = useWindowSize()

  useEffect(() => {
    dispatch(loadProviders())
  }, [dispatch])

  return (
    <>
      <>
        {windowSize !== "lg" && <MobileNavigation />}
        <div className="flex max-h-mobile min-h-mobile lg:min-h-screen">
          <DesktopNavigation />

          {!activeProvider && (
            <div className="flex w-full justify-center pt-4">
              <Loading />
            </div>
          )}

          {activeProvider && (
            <div className="flex flex-1 flex-col overflow-auto lg:pl-16">
              {children}
              <GlobalAlert />
              <div className="right-2 top-1 hidden gap-1 lg:absolute lg:flex">
                <FirebirdSignOut />
                <KwilFaucet />
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

      <ReadOnlyModal activeAccount={activeAccount} />

      <ProviderOfflineModal />
    </>
  )
}
