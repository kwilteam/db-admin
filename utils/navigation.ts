import { DatabaseIcon, SettingsIcon, IdeIcon, FirebirdIcon } from "./icons"

export interface INavigationItem {
  name: string
  href: string
  activePathPrefix: string
  icon: React.ComponentType<{ className?: string }>
  hasSecondaryMobileMenu: boolean // If a secondary menu exists on mobile
  closeMobileNavOnSelect?: boolean // If the mobile nav should be closed after clicking on the navigation item
}

export const navigationItems: INavigationItem[] = [
  {
    name: "Firebird",
    href: "/firebird/deployments",
    activePathPrefix: "/firebird",
    icon: FirebirdIcon,
    hasSecondaryMobileMenu: false,
    closeMobileNavOnSelect: true,
  },
  {
    name: "Databases",
    href: "/databases",
    activePathPrefix: "/databases",
    icon: DatabaseIcon,
    hasSecondaryMobileMenu: true,
  },
  {
    name: "IDE",
    href: "/ide",
    activePathPrefix: "/ide",
    icon: IdeIcon,
    hasSecondaryMobileMenu: true,
  },
  // {
  //   name: "Extensions",
  //   href: "/extensions",
  //   icon: ExtensionsIcon,
  //   hasSecondaryMobileMenu: true,
  //   closeMobileMenu: true,
  // },
  {
    name: "Settings",
    href: "/settings/providers",
    activePathPrefix: "/settings",
    icon: SettingsIcon,
    hasSecondaryMobileMenu: true,
    closeMobileNavOnSelect: true,
  },
]
