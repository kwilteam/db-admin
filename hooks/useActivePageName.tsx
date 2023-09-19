import { navigationItems } from "@/util/navigation"
import { usePathname } from "next/navigation"

const useActivePageName = (): string | undefined => {
  const pathname = usePathname()
  const activePageName = navigationItems.find((item) =>
    pathname.startsWith(item.href),
  )?.name

  if (!activePageName)
    throw new Error(`No active page name found for pathname: ${pathname}`)

  return activePageName
}

export default useActivePageName
