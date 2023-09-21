"use client"

import { Menu, Transition } from "@headlessui/react"
import Link from "next/link"
import React, { Fragment } from "react"
import { ProfileIcon, SignOutIcon } from "@/utils/icons"
import classNames from "classnames"

interface IProps {
  userName: string
}

export default function UserInfo({ userName }: IProps) {
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")

  return (
    <Menu as="div">
      <Menu.Button className="flex select-none flex-row gap-3 lg:w-full lg:border-t lg:border-kwil-dark/40 lg:p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-sm uppercase">
          {initials}
        </div>
        <div className="hidden items-center justify-center text-sm leading-10 text-slate-100 lg:flex">
          {userName}
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-1 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:bottom-20 lg:left-4 lg:w-64">
          <div className="px-1 py-1 ">
            {userOptions.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <Link href={option.href}>
                    <button
                      className={classNames({
                        "group flex w-full items-center rounded-md px-2 py-2 text-sm":
                          true,
                        "bg-gray-100 ": active,
                      })}
                    >
                      <option.icon className="mr-2 h-6 w-6" />
                      {option.name}
                    </button>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

interface IUserOption {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const userOptions: IUserOption[] = [
  {
    name: "Profile",
    href: "/settings/profile",
    icon: ProfileIcon,
  },
  {
    name: "Sign out",
    href: "/api/sign-out",
    icon: SignOutIcon,
  },
]
