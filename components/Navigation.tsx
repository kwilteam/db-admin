"use client"

import { navigationItems } from "@/utils/navigation"
import NavigationItem from "./NavigationItem"

export default function Navigation() {
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="mx-1 mt-2 flex flex-col gap-2">
        {navigationItems.map((item) => (
          <NavigationItem key={item.name} item={item} />
        ))}
      </ul>
    </nav>
  )
}
