import { IFirebirdDeployment } from "@/utils/firebird/types"
import { add15DaysToTimestamp, formatTimestamp } from "@/utils/helpers"
import ConnectToProvider from "./ConnectToProvider"

export const DeploymentInfo = ({
  instanceName,
  createdAt,
  isDeploymentActive,
  deployment,
  activeProvider,
}: {
  instanceName: string
  createdAt: number
  isDeploymentActive: boolean
  deployment: IFirebirdDeployment
  activeProvider: string | undefined
}) => {
  const machines = deployment.config.machines

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-medium">{instanceName}</h1>
      </div>
      <div className="text-xs text-slate-500">{formatTimestamp(createdAt)}</div>
      <div className="text-xs text-slate-400 whitespace-nowrap">Expires on: {add15DaysToTimestamp(createdAt)}</div>
      {isDeploymentActive && (
        <ConnectToProvider
          deployment={deployment}
          isActiveProvider={activeProvider === machines.instance_name}
        />
      )}
    </div>
  )
}
