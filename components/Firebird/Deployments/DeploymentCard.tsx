import Link from "next/link"
import Image from "next/image"
import { DeploymentStatus, IFirebirdDeployment } from "@/utils/firebird/types"
import { ChainIcon, ChevronDownIcon } from "@/utils/icons"
import { capitalize, formatTimestamp } from "@/utils/helpers"
import { DeploymentBadge } from "./DeploymentBadge"

// Have to include here as Tailwind struggles to import from the types file
export const statusColor = {
  [DeploymentStatus.PENDING]: "bg-blue-500/80",
  [DeploymentStatus.DEPLOYING]: "bg-yellow-500/80",
  [DeploymentStatus.ACTIVE]: "bg-emerald-500/80",
  [DeploymentStatus.FAILED]: "bg-red-500/80",
  [DeploymentStatus.STOPPED]: "bg-red-600/80",
  [DeploymentStatus.TERMINATED]: "bg-red-600/80",
}

export default function DeploymentCard({
  deployment,
}: {
  deployment: IFirebirdDeployment
}) {
  console.log(deployment, "Deployment")

  const chain = deployment.config.chain
  const machines = deployment.config.machines
  const status = deployment.status

  const statusColorClass = statusColor[status] || "bg-slate-100"

  return (
    <Link href={`/firebird/deployments/${deployment.id}`}>
      <div className="flex grow cursor-pointer select-none flex-row items-center gap-3 rounded-md border border-slate-100 bg-slate-50/70 px-4 py-6">
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

            <button className="rounded-md border border-slate-100 bg-white p-1 hover:bg-slate-50">
              <ChevronDownIcon className="h-3 w-3" />
            </button>
          </div>
          <div className="text-xs text-slate-500">
            {formatTimestamp(deployment.created_at)}
          </div>

          <div className="flex flex-row items-center justify-start gap-2 text-xs text-slate-500">
            <DeploymentBadge>
              <div
                className={`h-2 w-2 rounded-full border border-slate-100 ${statusColorClass}`}
              />
              <span>{capitalize(status)}</span>
            </DeploymentBadge>

            <DeploymentBadge>
              <Image
                src="/images/kwil.png"
                className="h-4 w-4"
                alt={machines.instance_name}
                width={16}
                height={16}
              />

              <span>{chain.version}</span>
            </DeploymentBadge>
            <DeploymentBadge>
              <ChainIcon className="h-4 w-4" />
              <span>{chain.chain_id}</span>
            </DeploymentBadge>
          </div>
        </div>
      </div>
    </Link>
  )
}
