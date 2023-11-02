import { navigationItems } from "@/utils/navigation"
import { usePathname } from "next/navigation"

const useActivePageName = (): string | undefined => {
  const pathname = usePathname()
  const activePageName = navigationItems.find((item) =>
    pathname.startsWith(item.href),
  )?.name

  if (!activePageName) return undefined

  return activePageName
}

export default useActivePageName
