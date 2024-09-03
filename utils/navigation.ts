import {
  DatabaseIcon,
  SettingsIcon,
  IdeIcon,
  ExtensionsIcon,
  FirebirdIcon,
} from "./icons"

export interface INavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  secondaryMobileMenu: boolean // If a secondary menu should be available on mobile
  closeMobileMenu?: boolean // If the mobile menu should be closed after clicking on the navigation item
}

export const navigationItems: INavigationItem[] = [
  {
    name: "Databases",
    href: "/databases",
    icon: DatabaseIcon,
    secondaryMobileMenu: true,
  },
  {
    name: "IDE",
    href: "/ide",
    icon: IdeIcon,
    secondaryMobileMenu: true,
  },
  // {
  //   name: "Extensions",
  //   href: "/extensions",
  //   icon: ExtensionsIcon,
  //   secondaryMobileMenu: true,
  //   closeMobileMenu: true,
  // },
  {
    name: "Settings",
    href: "/settings/providers",
    icon: SettingsIcon,
    secondaryMobileMenu: true,
  },
  {
    name: "Firebird",
    href: "/firebird/deployments",
    icon: FirebirdIcon,
    secondaryMobileMenu: false,
    closeMobileMenu: true,
  },
]
