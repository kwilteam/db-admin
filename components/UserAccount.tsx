"use client"

import { useEffect, useState, Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { useAppDispatch } from "@/store/hooks"
import { ModalEnum, saveActiveAccount, setModal } from "@/store/global"
import { ChevronDownIcon, ProfileIcon, SignOutIcon } from "@/utils/icons"

interface IUserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  activeAccount: string | undefined
}

export default function UserAccount({
  activeAccount,
  ...props
}: IUserInfoProps) {
  const dispatch = useAppDispatch()
  const [abbreviatedAccount, setAbbreviatedAccount] = useState<
    string | undefined
  >()

  const disconnectWallet = () => {
    dispatch(saveActiveAccount(undefined))
    // Will show Connect modal after disconnecting
    dispatch(setModal(ModalEnum.CONNECT))
  }

  const openConnectWalletDialog = () => {
    dispatch(setModal(ModalEnum.CONNECT))
  }

  useEffect(() => {
    if (activeAccount) {
      const _abbreviatedUser =
        activeAccount.slice(0, 5) + "..." + activeAccount.slice(-5)

      setAbbreviatedAccount(_abbreviatedUser)
    } else setAbbreviatedAccount(undefined)
  }, [activeAccount])

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      dispatch(saveActiveAccount(accounts[0]))
    })

    return () => {
      window.ethereum.removeAllListeners()
    }
  }, [dispatch])

  if (!activeAccount)
    return (
      <>
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white p-1 px-2 text-sm font-thin text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          onClick={openConnectWalletDialog}
        >
          Connect
        </button>
      </>
    )

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white p-1 text-sm font-thin text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <ProfileIcon className="h-4 w-4" />
          <span>{abbreviatedAccount}</span>
          <ChevronDownIcon
            className="h-4 w-4 text-slate-800"
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
        <Menu.Items className="absolute right-0 mt-1 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5  focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <div
                className="group flex w-full cursor-pointer items-center gap-2 rounded-md p-1 text-xs hover:bg-slate-50"
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
