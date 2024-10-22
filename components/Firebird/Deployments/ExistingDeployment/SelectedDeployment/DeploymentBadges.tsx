import { DeploymentStatus } from "@/utils/firebird/types"
import Image from "next/image"
import { ChainIcon } from "@/utils/icons"
import { capitalize } from "@/utils/helpers"
import { LargeDeploymentBadge } from "../../DeploymentBadge"

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
    <>
      <MobileDeploymentBadges
        status={status}
        chainVersion={chainVersion}
        chainId={chainId}
      />
      <DesktopDeploymentBadges
        status={status}
        chainVersion={chainVersion}
        chainId={chainId}
      />
    </>
  )
}

const MobileDeploymentBadges = ({
  status,
  chainVersion,
  chainId,
}: {
  status: DeploymentStatus
  chainVersion: string
  chainId: string
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-2 text-xs text-slate-500 lg:hidden">
      <div className="flex w-full flex-row items-center justify-start gap-2">
        <LargeDeploymentBadge info="Status" className="w-full">
          <div
            className={`h-2 w-2 rounded-full border border-slate-100 ${statusColor[status]} ${status === DeploymentStatus.DEPLOYING ? "animate-pulse" : ""}`}
          />
          <span>{capitalize(status)}</span>
        </LargeDeploymentBadge>

        <LargeDeploymentBadge info="KwilD" className="w-full">
          <Image
            src="/images/kwil.png"
            className="h-4 w-4"
            alt={chainVersion}
            width={16}
            height={16}
          />
          <span>{chainVersion}</span>
        </LargeDeploymentBadge>
      </div>

      <LargeDeploymentBadge info="Chain ID" className="w-full">
        <ChainIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">{chainId.slice(0, 35)}</span>
      </LargeDeploymentBadge>
    </div>
  )
}

const DesktopDeploymentBadges = ({
  status,
  chainVersion,
  chainId,
}: {
  status: DeploymentStatus
  chainVersion: string
  chainId: string
}) => {
  return (
    <div className="hidden flex-row items-center justify-start gap-4 text-xs text-slate-500 lg:flex lg:w-auto mt-1">
      <LargeDeploymentBadge info="Status" className="w-auto">
        <div
          className={`h-2 w-2 rounded-full border border-slate-100 ${statusColor[status]} ${status === DeploymentStatus.DEPLOYING ? "animate-pulse" : ""}`}
        />
        <span>{capitalize(status)}</span>
      </LargeDeploymentBadge>

      <LargeDeploymentBadge info="KwilD" className="w-auto">
        <Image
          src="/images/kwil.png"
          className="h-4 w-4"
          alt={chainVersion}
          width={16}
          height={16}
        />
        <span>{chainVersion}</span>
      </LargeDeploymentBadge>

      <LargeDeploymentBadge info="Chain ID" className="w-auto">
        <ChainIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">{chainId.slice(0, 35)}</span>
      </LargeDeploymentBadge>
    </div>
  )
}
