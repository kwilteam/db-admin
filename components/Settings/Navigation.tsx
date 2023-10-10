"use client"

import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AccountsIcon, SettingsIcon } from "@/utils/icons"

interface ISettingsItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const settingsItems: ISettingsItem[] = [
  //   {
  //     name: "General",
  //     href: "/settings/general",
  //     icon: SettingsIcon,
  //   },
  {
    name: "Accounts",
    href: "/settings/accounts",
    icon: AccountsIcon,
  },
]

export default function SettingsNavigation() {
  const pathname = usePathname()

  return (
    <ul className="list-none text-sm">
      {settingsItems.map((item) => (
        <Link key={item.name} href={item.href}>
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
