"use client"

import type { INavigationItem } from "@/utils/navigation"
import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

interface IProps {
  item: INavigationItem
}

export default function NavigationItem({ item }: IProps) {
  const pathname = usePathname()

  return (
    <li key={item.href} className="group relative">
      <Link
        href={item.href}
        className={classNames({
          "flex h-12 w-12 flex-row items-center justify-center gap-3 rounded-full p-1 text-sm text-white hover:bg-kwil-dark hover:text-slate-100 hover:drop-shadow-md":
            true,
          "bg-kwil-dark text-slate-100 drop-shadow-md": pathname.startsWith(
            item.href,
          ),
        })}
      >
        <item.icon className="h-6 w-6" />
        <span
          className={classNames({
            "absolute left-[52px] top-2 hidden w-auto rounded-lg bg-black/75 p-2 text-xs text-white":
              true,
            "lg:hidden": pathname.startsWith(item.href),
            "group-hover:block": !pathname.startsWith(item.href),
          })}
        >
          {item.name}
        </span>
      </Link>
    </li>
  )
}
