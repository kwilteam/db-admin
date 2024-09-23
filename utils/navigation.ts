import { DatabaseIcon, SettingsIcon, IdeIcon, FirebirdIcon } from "./icons"

export interface INavigationItem {
  name: string
  href: string
  activePathPrefix: string
  icon: React.ComponentType<{ className?: string }>
  secondaryMobileMenu: boolean // If a secondary menu should be available on mobile
  closeMobileMenu?: boolean // If the mobile menu should be closed after clicking on the navigation item
}

export const navigationItems: INavigationItem[] = [
  {
    name: "Databases",
    href: "/databases",
    activePathPrefix: "/databases",
    icon: DatabaseIcon,
    secondaryMobileMenu: true,
  },
  {
    name: "IDE",
    href: "/ide",
    activePathPrefix: "/ide",
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
    activePathPrefix: "/settings",
    icon: SettingsIcon,
    secondaryMobileMenu: true,
    closeMobileMenu: true,
  },
  {
    name: "Firebird",
    href: "/firebird/deployments",
    activePathPrefix: "/firebird",
    icon: FirebirdIcon,
    secondaryMobileMenu: false,
    closeMobileMenu: true,
  },
]
