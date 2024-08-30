import Image from "next/image"
import { DeploymentStatus, IFirebirdDeployment } from "@/utils/firebird/types"
import { ChainIcon, ProviderIcon } from "@/utils/icons"
import { capitalize, formatTimestamp } from "@/utils/helpers"
import { DeploymentBadge } from "../DeploymentBadge"

// Have to include here as Tailwind struggles to import from the types file
export const statusColor = {
  [DeploymentStatus.PENDING]: "bg-blue-500/80",
  [DeploymentStatus.DEPLOYING]: "bg-yellow-500/80",
  [DeploymentStatus.ACTIVE]: "bg-emerald-500/80",
  [DeploymentStatus.FAILED]: "bg-red-500/80",
  [DeploymentStatus.STOPPED]: "bg-red-600/80",
  [DeploymentStatus.TERMINATED]: "bg-red-600/80",
}

export default function SelectedDeploymentCard({
  deployment,
}: {
  deployment: IFirebirdDeployment
}) {
  console.log(deployment, "Deployment")

  const chain = deployment.config.chain
  const machines = deployment.config.machines
  const status = deployment.status
  const providerEndpoint = deployment.endpoints.chain

  const connectToProvider = () => {
    console.log("Connect to provider", providerEndpoint)
  }

  const statusColorClass = statusColor[status] || "bg-slate-100"

  return (
    <div className="flex w-full flex-col gap-3 rounded-md border border-slate-100 p-3">
      <div className="flex w-full items-center justify-center gap-8 px-4 py-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-md border border-slate-100 bg-white p-2">
          <Image
            src="/images/kwil.png"
            alt={machines.instance_name}
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-lg font-medium">{machines.instance_name}</h1>
          </div>
          <div className="text-xs text-slate-500">
            {formatTimestamp(deployment.created_at)}
          </div>
        </div>

        <div className="flex flex-row items-center justify-start gap-2 text-xs text-slate-500">
          <DeploymentBadge className="p-4">
            <div
              className={`h-2 w-2 rounded-full border border-slate-100 ${statusColorClass}`}
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

          <div
            className="flex cursor-pointer flex-row items-center gap-2 rounded-md border border-slate-100 bg-kwil p-4 text-slate-50"
            onClick={connectToProvider}
          >
            <ProviderIcon className="h-4 w-4" />
            Connect to Provider
          </div>
        </div>
      </div>
    </div>
  )
}
