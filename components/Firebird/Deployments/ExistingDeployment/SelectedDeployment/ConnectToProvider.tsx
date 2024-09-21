import classNames from "classnames"
import { IFirebirdDeployment } from "@/utils/firebird/types"
import { KwilProviderStatus } from "@/store/providers"
import { useConnectToProvider } from "@/hooks/firebird/use-connect-to-provider"
import { selectProviderStatus } from "@/store/global"
import { useAppSelector } from "@/store/hooks"
import { CheckIcon, CloseIcon, ProviderIcon } from "@/utils/icons"

export default function ConnectToProvider({
  deployment,
  isActiveProvider,
}: {
  deployment: IFirebirdDeployment
  isActiveProvider: boolean
}) {
  const providerStatus = useAppSelector(selectProviderStatus)
  const { connectToProvider, displayConnectedModal } = useConnectToProvider({
    providerEndpoint: deployment.service_endpoints?.kwil_rpc_provider || "",
    instanceName: deployment.config.machines.instance_name || "",
    chainId: deployment.config.chain.chain_id || "",
  })
  const isConnected =
    isActiveProvider && providerStatus === KwilProviderStatus.Online

  const isOffline =
    isActiveProvider && providerStatus === KwilProviderStatus.Offline

  const onClick = isOffline
    ? undefined
    : isConnected
      ? displayConnectedModal
      : connectToProvider

  const buttonClasses =
    "flex w-full flex-row items-center justify-center gap-2 rounded-md border p-2 text-xs"
  const alreadyConnectedClasses =
    "border-kwil bg-white text-kwil cursor-pointer"
  const connectClasses = "border-slate-100 bg-kwil text-slate-50 cursor-pointer"
  const offlineClasses =
    "border-red-500 bg-white text-red-500 cursor-not-allowed"

  return (
    <button
      className={classNames(buttonClasses, {
        [alreadyConnectedClasses]: isConnected,
        [offlineClasses]: isOffline,
        [connectClasses]: !isConnected && !isOffline,
      })}
      onClick={onClick}
    >
      {isConnected ? (
        <div className="flex flex-row items-center gap-2">
          <CheckIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">Connected</span>
        </div>
      ) : isOffline ? (
        <div className="flex flex-row items-center gap-2">
          <CloseIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">Offline</span>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <ProviderIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">Connect</span>
        </div>
      )}
    </button>
  )
}
