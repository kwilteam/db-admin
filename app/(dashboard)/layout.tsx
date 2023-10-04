import MobileNavigation from "@/components/MobileNavigation"
import Navigation from "@/components/Navigation"
import UserInfo from "@/components/UserInfo"
import { ReduxProvider } from "@/store/Provider"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface IProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: IProps) {
  return (
    <ReduxProvider>
      <MobileNavigation />

      <div className="flex min-h-screen">
        {/* <div className="hidden bg-kwil lg:fixed lg:flex lg:min-h-screen lg:w-72 lg:flex-col">
          <Image
            src="/images/kwil-white-horizontal.svg"
            alt="Kwil Logo"
            className="mx-auto mb-12 mt-6 h-auto"
            width={140}
            height={80}
            priority
          />
          <div className="flex flex-grow flex-col justify-between">
            <Navigation />

            <UserInfo userName="Martin Creedy" />
          </div>
        </div> */}

        <div className="hidden bg-kwil lg:fixed lg:flex lg:min-h-screen lg:w-16 lg:flex-col">
          <Link href="/databases">
            <Image
              src="/images/kwil-white.png"
              alt="Kwil Logo"
              className="mx-auto my-1 h-auto cursor-pointer p-3"
              width={80}
              height={80}
              priority
            />
          </Link>
          <div className="flex flex-grow flex-col items-center justify-between">
            <Navigation />

            <UserInfo userName="Martin Creedy" />
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:overflow-hidden lg:pl-16">
          {children}
        </div>
      </div>
    </ReduxProvider>
  )
}
