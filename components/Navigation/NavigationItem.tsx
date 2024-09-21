"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import classNames from "classnames"
import type { INavigationItem } from "@/utils/navigation"
import { useAppDispatch } from "@/store/hooks"
import { setIsMenuOpen } from "@/store/global"

interface IProps {
  item: INavigationItem
}

export default function NavigationItem({ item }: IProps) {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  return (
    <li key={item.href} className="group relative">
      <Link
        data-testid={`nav-item-${item.name}`}
        href={item.href}
        className={classNames({
          "flex h-12 w-12 flex-row items-center justify-center gap-3 rounded-full p-1 text-sm text-white hover:bg-kwil-dark hover:text-slate-100 hover:drop-shadow-md":
            true,
          "bg-kwil-dark text-slate-100 drop-shadow-md": pathname?.startsWith(
            item.activePathPrefix,
          ),
        })}
        onClick={() => {
          if (item.closeMobileMenu) {
            dispatch(setIsMenuOpen(false))
          }
        }}
      >
        <item.icon className="h-6 w-6" />
      </Link>
    </li>
  )
}
