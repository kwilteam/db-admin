import { HiOutlineCircleStack, HiOutlineCog8Tooth } from "react-icons/hi2"

export interface INavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className: string }>
}

export const navigationItems: INavigationItem[] = [
  {
    name: "Databases",
    href: "/databases",
    icon: HiOutlineCircleStack,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: HiOutlineCog8Tooth,
  },
]
