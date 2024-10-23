import Link from "next/link"
import Image from "next/image"
import { useAppDispatch } from "@/store/hooks"
import { DeploymentStatus, IFirebirdDeployment } from "@/utils/firebird/types"
import { ChainIcon, DeleteIcon } from "@/utils/icons"
import { add15DaysToTimestamp, capitalize, formatTimestamp } from "@/utils/helpers"
import { DeploymentBadge } from "./DeploymentBadge"
import { ModalEnum, setModal, setModalData } from "@/store/global"

// Have to include here as Tailwind struggles to import from the types file
export const statusColor = {
  [DeploymentStatus.PENDING]: "bg-blue-500/80",
  [DeploymentStatus.DEPLOYING]: "bg-yellow-500/80",
  [DeploymentStatus.STARTING]: "bg-orange-500/80",
  [DeploymentStatus.ACTIVE]: "bg-emerald-500/80",
  [DeploymentStatus.FAILED]: "bg-red-500/80",
  [DeploymentStatus.STOPPED]: "bg-red-600/80",
  [DeploymentStatus.STOPPING]: "bg-orange-500/80",
  [DeploymentStatus.TERMINATED]: "bg-red-600/80",
}

export default function DeploymentCard({
  deployment,
}: {
  deployment: IFirebirdDeployment
}) {
  const dispatch = useAppDispatch()

  const chain = deployment.config.chain
  const machines = deployment.config.machines
  const status = deployment.status

  const statusColorClass =
    statusColor[status as keyof typeof statusColor] || "bg-slate-100"

  const triggerDeleteDeploymentModal = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    dispatch(setModal(ModalEnum.DELETE_DEPLOYMENT))
    dispatch(setModalData({ deploymentId: deployment.id }))
  }

  return (
    <Link href={`/firebird/deployments/${deployment.id}`}>
      <div
        data-testid="deployment-card"
        className="flex grow cursor-pointer select-none flex-row items-center gap-3 rounded-md border border-slate-100 bg-slate-50/70 px-4 py-6"
      >
        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-md border border-slate-100 bg-white p-2">
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

            {deployment.status === DeploymentStatus.ACTIVE && (
              <button
                className="rounded-full border border-slate-100 p-1 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                onClick={triggerDeleteDeploymentModal}
              >
                <DeleteIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="hidden text-xs text-slate-500 lg:block">
            {formatTimestamp(deployment.created_at)}
          </div>

          <div className="hidden text-xs text-slate-400 lg:block">
            Expires on: {add15DaysToTimestamp(deployment.created_at)}
          </div>

          <MobileDeploymentBadges
            deployment={deployment}
            statusColorClass={statusColorClass}
          />

          <DesktopDeploymentBadges
            deployment={deployment}
            statusColorClass={statusColorClass}
          />
        </div>
      </div>
    </Link>
  )
}

const MobileDeploymentBadges = ({
  deployment,
  statusColorClass,
}: {
  deployment: IFirebirdDeployment
  statusColorClass: string
}) => {
  const chain = deployment.config.chain
  const machines = deployment.config.machines
  const status = deployment.status

  return (
    <div className="flex flex-col items-start justify-start gap-2 text-xs text-slate-500 lg:hidden">
      <div className="flex w-full flex-row items-center justify-start gap-2">
        <DeploymentBadge className="grow">
          <div
            className={`h-2 w-2 rounded-full border border-slate-100 ${statusColorClass}`}
          />
          <span>{capitalize(status)}</span>
        </DeploymentBadge>

        <DeploymentBadge className="grow">
          <Image
            src="/images/kwil.png"
            className="h-4 w-4"
            alt={machines.instance_name}
            width={16}
            height={16}
          />

          <span>{chain.version}</span>
        </DeploymentBadge>
      </div>

      <DeploymentBadge className="w-full">
        <ChainIcon className="mr-2 h-4 w-4 flex-shrink-0" />
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {chain.chain_id.slice(0, 35)}
        </span>
      </DeploymentBadge>
    </div>
  )
}

const DesktopDeploymentBadges = ({
  deployment,
  statusColorClass,
}: {
  deployment: IFirebirdDeployment
  statusColorClass: string
}) => {
  const chain = deployment.config.chain
  const machines = deployment.config.machines
  const status = deployment.status

  return (
    <div className="hidden flex-row items-start justify-start gap-2 text-xs text-slate-500 lg:flex">
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
  )
}
