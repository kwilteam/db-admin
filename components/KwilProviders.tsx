"use client"

import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, PlusIcon, ProviderIcon } from "@/utils/icons"
import classNames from "classnames"

export enum KwilProviderStatus {
  Unknown,
  Online,
  Offline,
}

interface IKwilProvider {
  name: string
  url: string
  status: KwilProviderStatus
}

interface IKwilProvidersProps extends React.HTMLAttributes<HTMLDivElement> {
  currentProvider: string
}

// TODO: get providers from store (loaded from indexedDB)
const providers: IKwilProvider[] = [
  {
    name: "Testnet",
    url: "https://testnet.kwil.com",
    status: KwilProviderStatus.Online,
  },
  {
    name: "Localhost",
    url: "http://localhost:8080",
    status: KwilProviderStatus.Unknown,
  },
  {
    name: "My Server",
    url: "http://myserver.com",
    status: KwilProviderStatus.Offline,
  },
]

export default function KwilProviders({
  currentProvider,
  ...props
}: IKwilProvidersProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-2 rounded-md bg-kwil/70 px-4 py-2 text-sm font-thin text-white hover:bg-kwil/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <ProviderIcon className="h-5 w-5" />
          <span>{currentProvider}</span>
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
            {providers.map((provider) => (
              <ProviderItem
                isCurrent={provider.name === currentProvider}
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
  return (
    <Menu.Item key={provider.name}>
      <button
        className={classNames({
          "group my-1 flex w-full items-center gap-2 overflow-clip rounded-md px-2 py-3 text-sm hover:bg-kwil-light/10 focus:outline-none":
            true,
          "bg-kwil-light/10": isCurrent,
        })}
      >
        <div
          className={classNames("block h-2 w-2 flex-shrink-0 rounded-full", {
            "bg-lime-500": provider.status === KwilProviderStatus.Online,
            "bg-amber-400": provider.status === KwilProviderStatus.Unknown,
            "bg-red-500":
              provider.status !== KwilProviderStatus.Online &&
              provider.status !== KwilProviderStatus.Unknown,
          })}
        />

        <span className="flex flex-shrink-0 text-xs font-medium text-slate-800">
          {provider.name}
        </span>

        <span className="flex-grow overflow-clip truncate text-xs text-slate-400">
          {provider.url}
        </span>
      </button>
    </Menu.Item>
  )
}
