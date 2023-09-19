"use client"

import { navigationItems } from "@/util/navigation"
import NavigationItem from "./NavigationItem"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2"
import Image from "next/image"
import UserInfo from "./UserInfo"
import DatabasesExplorer from "./DatabaseExplorer"
import { ChevronDownIcon, ChevronLeftIcon, DatabaseIcon } from "@/util/icons"
import useActivePageName from "@/hooks/useActivePageName"

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuContext, setMenuContext] = useState("")
  const activePageName = useActivePageName()

  return (
    <>
      <Transition as={Fragment} show={isMenuOpen}>
        <Dialog onClose={() => setIsMenuOpen(false)}>
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
            <nav className="fixed inset-y-0 left-0 flex w-5/6 max-w-[83.33%] flex-col bg-kwil lg:hidden">
              <Image
                src="/images/kwil-white-horizontal.svg"
                alt="Kwil Logo"
                className="mx-auto mb-10 mt-6 h-auto"
                width={120}
                height={33}
                priority
              />
              <button
                className="absolute right-2 top-2 p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <HiOutlineXMark className="h-6 w-6 text-slate-100" />
              </button>
              {(menuContext === "Root" || activePageName !== "Databases") && (
                <ul
                  role="list"
                  className="mx-4 flex flex-col gap-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navigationItems.map((item) => (
                    <NavigationItem key={item.name} item={item} />
                  ))}
                </ul>
              )}
              {activePageName === "Databases" && menuContext !== "Root" && (
                <Fragment>
                  <button
                    className="-mt-2 mb-1 ml-2 flex items-center justify-start text-sm text-white"
                    onClick={() => setMenuContext("Root")}
                  >
                    <ChevronLeftIcon className="mr-1 h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <ul>
                    <li>
                      <div className="mx-2 my-2 flex flex-row gap-2 rounded-md bg-kwil-dark p-2 text-sm leading-6 text-white drop-shadow-md hover:bg-kwil-dark hover:text-slate-100 hover:drop-shadow-md">
                        <DatabaseIcon className="h-6 w-6" />
                        <div>Databases</div>
                      </div>
                    </li>
                  </ul>
                  <div className="mx-2 mb-2 h-screen overflow-scroll rounded-md bg-white p-1">
                    <DatabasesExplorer setIsMenuOpen={setIsMenuOpen} />
                  </div>
                </Fragment>
              )}
            </nav>
          </Transition.Child>
        </Dialog>
      </Transition>

      <div className="flex flex-row items-center justify-between bg-kwil p-3 lg:hidden">
        <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
          <HiOutlineBars3 className="h-6 w-6 text-slate-100" />
        </button>
        <div className="text-lg text-slate-100">{activePageName}</div>
        <UserInfo userName="Martin Creedy" />
      </div>
    </>
  )
}
