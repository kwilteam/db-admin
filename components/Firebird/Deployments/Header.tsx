"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FirebirdIcon, PlusIcon } from "@/utils/icons"
import { useAppSelector } from "@/store/hooks"
import { selectActiveDeployment } from "@/store/firebird"
import { IFirebirdDeploymentConfig } from "@/utils/firebird/types"
import FirebirdSignOut from "../SignOut"

export default function Header() {
  return (
    <div className="max-w-screen lg:text-md flex h-10 select-none flex-row items-center gap-2 border-b border-slate-200 bg-slate-50 p-2 text-sm">
      <Link
        href="/firebird/deployments"
        className="flex items-center gap-2 hover:underline"
      >
        <FirebirdIcon className="h-4 w-4" />
        <span>Deployments</span>
      </Link>

      <NewDeploymentButton />

      <ExistingDeploymentName />

      <FirebirdSignOut />
    </div>
  )
}

const NewDeploymentButton = () => {
  const pathname = usePathname()
  const isDeploymentsHomePage = pathname === "/firebird/deployments"
  const shouldShowButton = isDeploymentsHomePage

  if (!shouldShowButton) {
    return null
  }

  return (
    <Link href="/firebird/deployments/new">
      <button className="hover:bg-kwil-blue/80 inline-flex items-center justify-center gap-1 rounded-md border border-slate-200 bg-kwil/90 p-1 px-2 text-sm font-thin text-white hover:bg-kwil focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        <PlusIcon className="h-4 w-4" /> New
      </button>
    </Link>
  )
}

const ExistingDeploymentName = () => {
  const activeDeployment = useAppSelector(selectActiveDeployment)

  if (!activeDeployment) {
    return null
  }

  const config = activeDeployment.config

  return <div>&gt; {config.machines.instance_name}</div>
}
