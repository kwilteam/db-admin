import { DatabaseIcon, SettingsIcon, IdeIcon, ExtensionsIcon } from "./icons"

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
    name: "IDE",
    href: "/ide",
    icon: IdeIcon,
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
