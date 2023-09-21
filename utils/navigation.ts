import { DatabaseIcon, SettingsIcon, CreateIcon, ExtensionsIcon } from "./icons"

export interface INavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  iconClassName?: string
}

export const navigationItems: INavigationItem[] = [
  {
    name: "Databases",
    href: "/databases",
    icon: DatabaseIcon,
  },
  {
    name: "Create",
    href: "/create",
    icon: CreateIcon,
  },
  {
    name: "Extensions",
    href: "/extensions",
    icon: ExtensionsIcon,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
]
