"use client"

import { Fragment, useEffect } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, PlusIcon, ProviderIcon } from "@/utils/icons"
import classNames from "classnames"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  IKwilProvider,
  KwilProviderStatus,
  loadProviders,
  selectProviders,
} from "@/store/providers"

interface IKwilProvidersProps extends React.HTMLAttributes<HTMLDivElement> {
  activeProvider: string | undefined
}

export default function KwilProviders({
  activeProvider,
  ...props
}: IKwilProvidersProps) {
  const dispatch = useAppDispatch()
  const providers = useAppSelector(selectProviders)

  if (!providers) return null

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-2 rounded-md bg-kwil/70 px-4 py-2 text-sm font-thin text-white hover:bg-kwil/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <ProviderIcon className="h-5 w-5" />
          <span>{activeProvider}</span>
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
        <Menu.Items className="absolute right-0 mt-3 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5  focus:outline-none">
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
              <button
                className="group flex w-full items-center gap-1 overflow-clip rounded-md px-2 py-2 text-sm hover:bg-kwil-light/10 focus:outline-none"
                onClick={() => console.log("add provider")}
              >
                <PlusIcon className="h-4 w-4 text-slate-800" />
                <span className="flex text-xs font-medium text-slate-800">
                  Add Provider
                </span>
              </button>
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
  provider: IKwilProvider
}) => {
  const dispatch = useAppDispatch()
  const { name, status, url } = provider

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            provider.status = KwilProviderStatus.Online
          } else {
            provider.status = KwilProviderStatus.Offline
          }
        })
        .catch(() => {
          provider.status = KwilProviderStatus.Offline
        })
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [url, provider])

  return (
    <Menu.Item key={name}>
      <button
        className={classNames({
          "group my-1 flex w-full items-center gap-2 overflow-clip rounded-md px-2 py-3 text-sm hover:bg-kwil-light/10 focus:outline-none":
            true,
          "bg-kwil-light/10": isCurrent,
        })}
      >
        <div
          className={classNames("block h-2 w-2 flex-shrink-0 rounded-full", {
            "border bg-lime-500": status === KwilProviderStatus.Online,
            "border bg-red-500": status === KwilProviderStatus.Offline,
            "animate-pulse bg-amber-500":
              status !== KwilProviderStatus.Online &&
              status !== KwilProviderStatus.Offline,
          })}
        />

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
