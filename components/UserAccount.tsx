"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectCurrentAccount, setCurrentAccount } from "@/store/global"
import { ChevronDownIcon, ProfileIcon, SignOutIcon } from "@/utils/icons"

import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"

interface IUserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  currentAccount: string | undefined
}

export default function UserAccount({
  currentAccount,
  ...props
}: IUserInfoProps) {
  const dispatch = useAppDispatch()
  const [abbreviatedAccount, setAbbreviatedAccount] = useState<
    string | undefined
  >()

  const disconnectWallet = () => {
    dispatch(setCurrentAccount(undefined))
  }

  useEffect(() => {
    if (currentAccount) {
      const _abbreviatedUser =
        currentAccount.slice(0, 5) + "..." + currentAccount.slice(-5)

      setAbbreviatedAccount(_abbreviatedUser)
    } else setAbbreviatedAccount(undefined)
  }, [currentAccount])

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      dispatch(setCurrentAccount(accounts[0]))
    })

    return () => {
      window.ethereum.removeAllListeners()
    }
  }, [dispatch])

  if (!currentAccount) return null

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-2 rounded-md bg-kwil/70 px-2 py-2 text-sm font-thin text-white hover:bg-kwil/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <ProfileIcon className="h-5 w-5" />
          <span>{abbreviatedAccount}</span>
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 text-white hover:text-slate-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5  focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <div
                className="group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-xs hover:bg-kwil-light/10"
                onClick={disconnectWallet}
              >
                <SignOutIcon className="h-4 w-4" />
                Disconnect
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
