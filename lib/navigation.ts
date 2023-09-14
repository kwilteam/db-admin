import {
  HiOutlineCircleStack,
  HiOutlineCog8Tooth,
  HiOutlinePencilSquare,
  HiOutlineBolt,
} from "react-icons/hi2"

export interface INavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className: string }>
  iconClassName?: string
}

export const navigationItems: INavigationItem[] = [
  {
    name: "Databases",
    href: "/databases",
    icon: HiOutlineCircleStack,
  },
  {
    name: "Create",
    href: "/create",
    icon: HiOutlinePencilSquare,
  },
  {
    name: "Extensions",
    href: "/extensions",
    icon: HiOutlineBolt,
    // iconClassName: "h-5 w-5",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: HiOutlineCog8Tooth,
  },
]

export const getActiveNavigationItem = (
  pathname: string,
): INavigationItem | undefined => {
  return navigationItems.find((item) => item.href === pathname)
}
