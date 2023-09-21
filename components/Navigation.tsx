"use client"

import { navigationItems } from "@/utils/navigation"
import NavigationItem from "./NavigationItem"

export default function Navigation() {
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="mx-4 flex flex-col gap-1">
        {navigationItems.map((item) => (
          <NavigationItem key={item.name} item={item} />
        ))}
      </ul>
    </nav>
  )
}
