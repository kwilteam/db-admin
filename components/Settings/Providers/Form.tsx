import classNames from "classnames"
import { IProvider } from "@/utils/idb/providers"
import { useAppSelector } from "@/store/hooks"
import { selectActiveProvider } from "@/store/providers"
import Input from "@/components/Input"
import { HelpIcon } from "@/utils/icons"

interface IFormProps {
  originalProviderName: string | undefined
  provider: IProvider | undefined
  setProvider: (provider: IProvider) => void
  connectNow: boolean
  setConnectNow: (connectNow: boolean) => void
  invalidFields: string[]
}

export default function Form({
  originalProviderName,
  provider,
  setProvider,
  connectNow,
  setConnectNow,
  invalidFields,
}: IFormProps) {
  const activeProvider = useAppSelector(selectActiveProvider)

  if (!provider) return

  return (
    <form
      data-testid="providers-form"
      className="m-1 overflow-scroll border border-slate-200 bg-white p-2 lg:m-2"
    >
      <div className="">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Name *
        </label>
        <div className="m-1">
          <div className="flex sm:max-w-md">
            <Input
              type="text"
              id="name"
              data-testid="provider-name-input"
              autoComplete="name"
              error={invalidFields.includes("name")}
              placeholder="Testnet"
              value={provider?.name ?? ""}
              onChange={(e) =>
                setProvider({ ...provider, name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="url"
            className="block text-sm font-medium leading-6 text-slate-900"
          >
            URL *
          </label>
          <div className="m-1">
            <div className="flex sm:max-w-md">
              <Input
                type="text"
                id="url"
                data-testid="provider-url-input"
                autoComplete="url"
                placeholder="https://testnet.kwil.com"
                error={invalidFields.includes("url")}
                value={provider?.url ?? ""}
                onChange={(e) =>
                  setProvider({ ...provider, url: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="Chain Id"
            className="flex text-sm font-medium leading-6 text-slate-900"
          >
            Chain Id
            <div className="group ml-1 hidden h-6 items-center md:inline-flex">
              <HelpIcon className="h-5 w-5 cursor-help" />
              <Tooltip className="ml-6" />
            </div>
          </label>
          <div className="m-1">
            <div className="flex sm:max-w-md">
              <Input
                type="text"
                id="chainId"
                data-testid="provider-chainId-input"
                autoComplete="chainId"
                placeholder="kwil-chain-testnet-0.6"
                value={provider?.chainId ?? ""}
                onChange={(e) =>
                  setProvider({ ...provider, chainId: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Only allow new providers or existing providers that are not already the active provider to see option to connect now */}
        {((originalProviderName && activeProvider !== originalProviderName) ||
          !originalProviderName) && (
          <div className="mt-3">
            <label
              htmlFor="connectNow"
              className="block text-sm font-medium leading-6 text-slate-900"
            >
              Connect now?
            </label>
            <div className="m-1">
              <div className="flex sm:max-w-md">
                <input
                  type="checkbox"
                  id="connectNow"
                  checked={connectNow}
                  onChange={(e) => setConnectNow(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-kwil focus:ring-kwil"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

function Tooltip({ ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={classNames(
        "absolute hidden w-auto rounded-lg bg-black/75 p-2 text-xs text-white group-hover:block",
        {
          [props.className as string]: props.className !== undefined,
        },
      )}
    >
      The chain Id is a unique identifier for the Kwil network. <br />
      For example, the chain id for the Kwil Longhorn testnet is &quot;
      <em>longhorn&quot;.</em>
      <br />
      If you do not know the chain Id, you can leave this field blank.
    </span>
  )
}
