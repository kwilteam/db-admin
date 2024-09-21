import { DeploymentStatus } from "@/utils/firebird/types"
import Image from "next/image"
import { ChainIcon } from "@/utils/icons"
import { capitalize } from "@/utils/helpers"
import { DeploymentBadge } from "../../DeploymentBadge"

// Have to include here as Tailwind struggles to import from the types file
export const statusColor = {
  [DeploymentStatus.PENDING]: "bg-blue-500/80",
  [DeploymentStatus.DEPLOYING]: "bg-yellow-500/80",
  [DeploymentStatus.ACTIVE]: "bg-emerald-500/80",
  [DeploymentStatus.FAILED]: "bg-red-500/80",
  [DeploymentStatus.STOPPED]: "bg-red-600/80",
  [DeploymentStatus.TERMINATED]: "bg-red-600/80",
}

export default function DeploymentBadges({
  status,
  chainVersion,
  chainId,
}: {
  status: DeploymentStatus
  chainVersion: string
  chainId: string
}) {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-2 text-xs text-slate-500 lg:w-auto lg:flex-row lg:gap-4">
      <div className="flex w-full flex-row items-center justify-start gap-2 lg:w-auto lg:gap-4">
        <DeploymentBadge info="Status" size="lg" className="w-full lg:w-auto">
          <div
            className={`h-2 w-2 rounded-full border border-slate-100 ${statusColor[status]} ${status === DeploymentStatus.DEPLOYING ? "animate-pulse" : ""}`}
          />
          <span>{capitalize(status)}</span>
        </DeploymentBadge>

        <DeploymentBadge info="KwilD" size="lg" className="w-full lg:w-auto">
          <Image
            src="/images/kwil.png"
            className="h-4 w-4"
            alt={chainVersion}
            width={16}
            height={16}
          />
          <span>{chainVersion}</span>
        </DeploymentBadge>
      </div>

      <DeploymentBadge info="Chain ID" size="lg" className="w-full lg:w-auto">
        <ChainIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">{chainId.slice(0, 35)}</span>
      </DeploymentBadge>
    </div>
  )
}
