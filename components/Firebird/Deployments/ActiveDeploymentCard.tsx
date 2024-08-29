import Image from "next/image"
import classNames from "classnames"
import {
  IFirebirdDeployment,
  IFirebirdDeploymentConfig,
  statusColor,
} from "@/utils/firebird/types"
import { ChainIcon } from "@/utils/icons"
import { capitalize, formatTimestamp } from "@/utils/helpers"
import { DeploymentBadge } from "./DeploymentBadge"

export default function ActiveDeploymentCard({
  deployment,
}: {
  deployment: IFirebirdDeployment
}) {
  console.log(deployment, "Deployment")

  const chain = deployment.config.chain
  const machines = deployment.config.machines
  const status = deployment.status

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex grow select-none flex-row items-center gap-3 border-b border-slate-100 px-4 py-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-md border border-slate-100 bg-white p-2">
          <Image
            src="/images/kwil.png"
            alt={machines.instance_name}
            width={40}
            height={40}
          />
        </div>
        <div className="flex grow flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-lg font-medium">{machines.instance_name}</h1>
          </div>
          <div className="text-xs text-slate-500">
            {formatTimestamp(deployment.created_at)}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-start gap-2 text-xs text-slate-500">
        <DeploymentBadge className="p-4">
          <div
            className={classNames(
              "h-2 w-2 rounded-full border border-slate-100",
              statusColor[status],
            )}
          />
          <span>{capitalize(status)}</span>
        </DeploymentBadge>

        <DeploymentBadge className="p-4">
          <Image
            src="/images/kwil.png"
            className="h-4 w-4"
            alt={machines.instance_name}
            width={16}
            height={16}
          />

          <span>{chain.version}</span>
        </DeploymentBadge>
        <DeploymentBadge className="p-4">
          <ChainIcon className="h-4 w-4" />
          <span>{chain.chain_id}</span>
        </DeploymentBadge>
      </div>
    </div>
  )
}
