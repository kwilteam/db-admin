import MobileNavigation from "@/components/MobileNavigation"
import Navigation from "@/components/Navigation"
import UserInfo from "@/components/UserInfo"
import Image from "next/image"
import React from "react"
import { HiOutlineBars3 } from "react-icons/hi2"

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <MobileNavigation />

      <div className="flex min-h-screen">
        <div className="hidden bg-kwil lg:fixed lg:flex lg:min-h-screen lg:w-72 lg:flex-col">
          <Image
            src="/images/kwil-white-horizontal.svg"
            alt="Kwil Logo"
            className="mx-auto mb-16 mt-6 h-auto"
            width={140}
            height={80}
            priority
          />
          <div className="flex flex-grow flex-col justify-between">
            <Navigation />

            <UserInfo userName="Martin Creedy" />
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:pl-72">{children}</div>
      </div>
    </>
  )
}
