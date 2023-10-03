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
    <li key={item.href}>
      <Link
        href={item.href}
        className={classNames({
          "flex flex-row gap-2 rounded-md p-4 text-sm leading-6 text-white hover:bg-kwil-dark hover:text-slate-100 hover:drop-shadow-md":
            true,
          "bg-kwil-dark text-slate-100 drop-shadow-md": pathname.startsWith(
            item.href,
          ),
        })}
      >
        <item.icon className="h-6 w-6" />

        <div>{item.name}</div>
      </Link>
    </li>
  )
}
