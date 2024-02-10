import classNames from "classnames"
import { IProvider } from "@/utils/idb/providers"
import { useAppSelector } from "@/store/hooks"
import { selectActiveProvider } from "@/store/providers"

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
      test-id="providers-form"
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
            <input
              type="text"
              id="name"
              test-id="provider-name-input"
              autoComplete="name"
              className={classNames(
                "block flex-1 rounded-md border bg-transparent p-2 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:leading-6",
                {
                  "border-slate-300": !invalidFields.includes("name"),
                  "border-red-500": invalidFields.includes("name"),
                },
              )}
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
              <input
                type="text"
                id="url"
                test-id="provider-url-input"
                autoComplete="url"
                placeholder="https://testnet.kwil.com"
                className={classNames(
                  "block flex-1 rounded-md border bg-transparent p-2 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:leading-6",
                  {
                    "border-slate-300": !invalidFields.includes("url"),
                    "border-red-500": invalidFields.includes("url"),
                  },
                )}
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
            className="block text-sm font-medium leading-6 text-slate-900"
          >
            Chain Id
          </label>
          <div className="m-1">
            <div className="flex sm:max-w-md">
              <input
                type="text"
                id="chainId"
                test-id="provider-chainId-input"
                autoComplete="chainId"
                placeholder="kwil-chain-testnet-0.6"
                className="block flex-1 rounded-md border bg-transparent p-2 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:leading-6"
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
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
