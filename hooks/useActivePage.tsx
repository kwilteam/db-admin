import { INavigationItem, navigationItems } from "@/utils/navigation"
import { usePathname } from "next/navigation"

const useActivePage = (): INavigationItem | undefined => {
  const pathname = usePathname()
  const activePage = navigationItems.find((item) =>
    pathname.startsWith(item.href),
  )

  if (!activePage) return undefined

  return activePage
}

export default useActivePage
