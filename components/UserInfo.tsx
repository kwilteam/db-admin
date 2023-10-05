"use client"

import { Fragment } from "react"
import Link from "next/link"
import { Menu, Transition } from "@headlessui/react"
import classNames from "classnames"
import { ProfileIcon, SignOutIcon } from "@/utils/icons"
import { useAppSelector } from "@/store/hooks"
import { selectCurrentUser } from "@/store/global"

interface IUserInfoProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserInfo({ ...props }: IUserInfoProps) {
  const userName = useAppSelector(selectCurrentUser) ?? "Martin Creedy"

  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")

  return (
    <Menu as="div">
      <Menu.Button
        className={classNames({
          "flex select-none flex-row gap-3 lg:w-full lg:p-2": true,
          [props.className as string]: props.className !== undefined,
        })}
      >
        <div className="my-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-sm uppercase">
          {initials}
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
        <Menu.Items className="absolute right-1 mt-2 w-32 origin-top-right divide-y divide-gray-900 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:bottom-16 lg:left-4">
          <div className="p-1">
            {userOptions.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <Link href={option.href}>
                    <button
                      className={classNames({
                        "group flex w-full items-center rounded-md px-2 py-2 text-xs text-slate-600":
                          true,
                        "bg-slate-50 ": active,
                      })}
                    >
                      <option.icon className="mr-2 h-5 w-5" />
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
  // {
  //   name: "Profile",
  //   href: "/settings/profile",
  //   icon: ProfileIcon,
  // },
  {
    name: "Sign out",
    href: "/api/sign-out",
    icon: SignOutIcon,
  },
]
