"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2"
import UserInfo from "../UserAccount"
import useActivePage from "@/hooks/use-active-page"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectIsMenuOpen, setIsMenuOpen } from "@/store/global"
import Main from "./Main"
import SchemaExplorer from "../Ide/SchemaExplorer"
import { usePathname } from "next/navigation"
import DatabaseExplorer from "../DatabaseExplorer"
import classNames from "classnames"
import SettingsNavigation from "../Settings/Navigation"
import ExtensionFilters from "../Extensions/Filters"

export default function MobileNavigation() {
  const dispatch = useAppDispatch()
  const isMenuOpen = useAppSelector(selectIsMenuOpen)
  const activePage = useActivePage()
  const pathname = usePathname()

  const secondaryMobileMenu = activePage?.secondaryMobileMenu ?? false

  return (
    <>
      <Transition as={Fragment} show={isMenuOpen}>
        <Dialog onClose={() => dispatch(setIsMenuOpen(false))}>
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50 lg:hidden" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-250"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in duration-250"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full"
          >
            <div className="fixed inset-y-0 z-30 flex">
              <div className="fixed inset-y-0 left-0 flex w-16 flex-col bg-kwil lg:hidden">
                <Main />
              </div>
              <div
                className={classNames({
                  "flex min-h-screen w-80 overflow-scroll border-r border-slate-100 bg-white pl-16 lg:hidden":
                    true,
                  hidden: !secondaryMobileMenu,
                })}
              >
                {pathname.startsWith("/databases") && <DatabaseExplorer />}
                {pathname.startsWith("/ide") && <SchemaExplorer />}
                {pathname.startsWith("/settings") && <SettingsNavigation />}
                {pathname.startsWith("/extensions") && <ExtensionFilters />}
              </div>
              <div
                className="h-10 lg:hidden"
                onClick={() => dispatch(setIsMenuOpen(false))}
              >
                <HiOutlineXMark
                  className={classNames({
                    "m-2 h-8 w-8 p-1 text-slate-50": true,
                    "ml-16": !secondaryMobileMenu,
                  })}
                />
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>

      <div className="flex flex-row items-center justify-between bg-kwil p-4 lg:hidden">
        <button
          className="lg:hidden"
          onClick={() => dispatch(setIsMenuOpen(true))}
        >
          <HiOutlineBars3 className="h-6 w-6 text-slate-100" />
        </button>
        <div className="text-slate-100">{activePage?.name}</div>
      </div>
    </>
  )
}
