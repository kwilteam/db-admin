"use client"

import { Fragment } from "react"
import Link from "next/link"
import { Menu, Transition } from "@headlessui/react"
import classNames from "classnames"
import {
  ChevronDownIcon,
  EditIcon,
  PlusIcon,
  ProviderIcon,
} from "@/utils/icons"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  KwilProviderStatus,
  saveActiveProvider,
  selectProviders,
} from "@/store/providers"
import { IProvider } from "@/utils/idb/providers"
import { setDatabaseActiveContext, setDatabases } from "@/store/database"
import { selectProviderStatus, setProviderStatus } from "@/store/global"

interface IKwilProvidersProps extends React.HTMLAttributes<HTMLDivElement> {
  activeProvider: string | undefined
}

export default function KwilProviders({ activeProvider }: IKwilProvidersProps) {
  const providers = useAppSelector(selectProviders)
  const providerStatus = useAppSelector(selectProviderStatus)

  if (!providers) return null

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white p-1 text-sm font-thin text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <ProviderIcon className="h-4 w-4" />
          <div
            data-testid="status-indicator"
            className={classNames("block h-2 w-2 flex-shrink-0 rounded-full", {
              "border bg-lime-500":
                providerStatus === KwilProviderStatus.Online,
              "border bg-red-500":
                providerStatus === KwilProviderStatus.Offline,
              "animate-pulse bg-amber-500":
                providerStatus !== KwilProviderStatus.Online &&
                providerStatus !== KwilProviderStatus.Offline,
            })}
          />
          <span className="max-w-[120px] truncate">{activeProvider}</span>
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
        <Menu.Items className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 pb-1">
            {providers &&
              providers.map((provider) => (
                <ProviderItem
                  isCurrent={provider.name === activeProvider}
                  key={provider.name}
                  provider={provider}
                />
              ))}
            <hr className="m-1 border-slate-100" />
            <Menu.Item>
              <Link href="/settings/providers/create">
                <button className="group flex w-full items-center gap-1 overflow-clip rounded-md px-2 py-2 text-sm hover:bg-slate-50 focus:outline-none">
                  <PlusIcon className="h-4 w-4 text-slate-800" />
                  <span className="flex text-xs font-medium text-slate-800">
                    Add Provider
                  </span>
                </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/settings/providers">
                <button className="group flex w-full items-center gap-1 overflow-clip rounded-md px-2 py-2 text-sm hover:bg-slate-50 focus:outline-none">
                  <EditIcon className="h-3 w-3 text-slate-800" />
                  <span className="ml-1 flex text-xs font-medium text-slate-800">
                    Manage Providers
                  </span>
                </button>
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const ProviderItem = ({
  isCurrent,
  provider,
}: {
  isCurrent: boolean
  provider: IProvider
}) => {
  const { name, url } = provider
  const dispatch = useAppDispatch()

  return (
    <Menu.Item key={name}>
      <button
        className={classNames({
          "group my-1 flex w-full items-center gap-2 overflow-clip rounded-md p-2 text-sm hover:bg-slate-50 focus:outline-none":
            true,
          "bg-slate-50": isCurrent,
        })}
        onClick={() => {
          if (isCurrent) return

          dispatch(saveActiveProvider(name))
          dispatch(setProviderStatus(KwilProviderStatus.Unknown))
          dispatch(setDatabases(undefined))
          dispatch(setDatabaseActiveContext(undefined))
        }}
      >
        <span className="flex flex-shrink-0 text-xs font-medium text-slate-800">
          {name}
        </span>

        <span className="flex-grow overflow-clip truncate text-xs text-slate-400">
          {url}
        </span>
      </button>
    </Menu.Item>
  )
}
