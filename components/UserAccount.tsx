"use client"

import { useEffect, useState, Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { useAppDispatch } from "@/store/hooks"
import { setActiveAccount, setModal } from "@/store/global"
import { ChevronDownIcon, ProfileIcon, SignOutIcon } from "@/utils/icons"
import { useKwilProvider } from "@/providers/WebKwilProvider"
import { usePathname } from "next/navigation"
import { formatEther } from "ethers"
import { getAddress } from "@/utils/wallet"
import { hexToBytes } from "@kwilteam/kwil-js/dist/utils/serial"

interface IUserInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  activeAccount: string | undefined
}

export default function UserAccount({ activeAccount }: IUserInfoProps) {
  const dispatch = useAppDispatch()
  const [abbreviatedAccount, setAbbreviatedAccount] = useState<
    string | undefined
  >()
  const [abbreviatedMobileAccount, setAbbreviatedMobileAccount] = useState<
    string | undefined
  >()

  const disconnectWallet = () => {
    dispatch(setActiveAccount(undefined))
  }

  const connectWallet = async () => {
    try {
      const address = await getAddress()
      dispatch(setActiveAccount(address))
      dispatch(setModal(undefined))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (activeAccount) {
      const _abbreviatedUser =
        activeAccount.slice(0, 5) + "..." + activeAccount.slice(-5)

      const _abbreviatedMobileUser =
        activeAccount.slice(0, 3) + "..." + activeAccount.slice(-3)

      setAbbreviatedAccount(_abbreviatedUser)
      setAbbreviatedMobileAccount(_abbreviatedMobileUser)
    } else setAbbreviatedAccount(undefined)
  }, [activeAccount])

  useEffect(() => {
    if (!window.ethereum) return

    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      dispatch(setActiveAccount(accounts[0]))
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
          onClick={connectWallet}
        >
          <ProfileIcon className="h-4 w-4" /> Connect
        </button>
      </>
    )

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-1 rounded-md border border-slate-200 bg-white p-1 text-sm font-thin text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <ProfileIcon className="h-4 w-4" />
          <span className="hidden md:flex">{abbreviatedAccount}</span>
          <span className="flex md:hidden">{abbreviatedMobileAccount}</span>
          <AccountBalance activeAccount={activeAccount} />
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
        <Menu.Items className="absolute right-0 mt-1 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1">
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

const AccountBalance = ({ activeAccount }: { activeAccount: string }) => {
  const pathname = usePathname()
  const kwilProvider = useKwilProvider()
  const [accountBalance, setAccountBalance] = useState<string | undefined>(
    undefined,
  )

  // Balance will be updated when the account changes or the user navigates to a different page
  useEffect(() => {
    if (!activeAccount || !kwilProvider) return

    const getAccount = async () => {
      console.log(activeAccount)
      const kwilAccount = await kwilProvider.getAccount(hexToBytes(activeAccount))

      if (kwilAccount && kwilAccount.data && kwilAccount.data.balance) {
        // Use formatEther to convert the balance from Wei to Ether
        const _balance = formatEther(kwilAccount.data.balance)
        // Format the balance to a fixed number of decimal places
        const formattedBalance = parseFloat(_balance).toFixed(3)
        setAccountBalance(formattedBalance)
      }
    }

    getAccount()
  }, [activeAccount, kwilProvider, pathname])

  return (
    <>
      {accountBalance && (
        <span className="text-xs font-thin text-slate-500">
          ({accountBalance})
        </span>
      )}
    </>
  )
}
