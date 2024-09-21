import classNames from "classnames"
import { IFirebirdDeployment } from "@/utils/firebird/types"
import { KwilProviderStatus } from "@/store/providers"
import { useConnectToProvider } from "@/hooks/firebird/use-connect-to-provider"
import { selectProviderStatus } from "@/store/global"
import { useAppSelector } from "@/store/hooks"
import { CheckIcon, ProviderIcon } from "@/utils/icons"

export default function ConnectToProvider({
  deployment,
  isActiveProvider,
}: {
  deployment: IFirebirdDeployment
  isActiveProvider: boolean
}) {
  const providerStatus = useAppSelector(selectProviderStatus)
  const { connectToProvider } = useConnectToProvider({
    providerEndpoint: deployment.service_endpoints?.kwil_rpc_provider || "",
    instanceName: deployment.config.machines.instance_name || "",
    chainId: deployment.config.chain.chain_id || "",
  })

  const buttonClasses =
    "flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-md border p-2 text-xs"
  const activeClasses = "border-kwil bg-white text-kwil"
  const inactiveClasses = "border-slate-100 bg-kwil text-slate-50"

  return (
    <button
      className={classNames(buttonClasses, {
        [activeClasses]:
          isActiveProvider && providerStatus === KwilProviderStatus.Online,
        [inactiveClasses]:
          !isActiveProvider || providerStatus !== KwilProviderStatus.Online,
      })}
      onClick={connectToProvider}
    >
      {isActiveProvider && providerStatus === KwilProviderStatus.Online ? (
        <>
          <CheckIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">Connected</span>
        </>
      ) : (
        <>
          <ProviderIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">Connect</span>
        </>
      )}
    </button>
  )
}
