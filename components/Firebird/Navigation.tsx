"use client"

import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DeploymentsIcon, ProviderIcon } from "@/utils/icons"
import { useAppDispatch } from "@/store/hooks"
import { setIsMenuOpen } from "@/store/global"

interface IDeploymentsItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const deploymentsItems: IDeploymentsItem[] = [
  {
    name: "Deployments",
    href: "/deployments/home",
    icon: DeploymentsIcon,
  },
]

export default function DeploymentsNavigation() {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  return (
    <ul className="w-full list-none text-sm">
      {deploymentsItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => {
            dispatch(setIsMenuOpen(false))
          }}
        >
          <li
            className={classNames({
              "flex h-10 cursor-pointer select-none flex-row items-center p-2 pl-3 pr-2 hover:text-kwil-dark":
                true,
              "bg-slate-50 text-kwil-dark": pathname.startsWith(item.href),
            })}
          >
            <item.icon className="mr-2 h-5 w-5" /> {item.name}
          </li>
        </Link>
      ))}
    </ul>
  )
}