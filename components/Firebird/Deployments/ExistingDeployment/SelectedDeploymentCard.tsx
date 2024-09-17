import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { DeploymentStatus, IFirebirdDeployment } from "@/utils/firebird/types"
import {
  ChainIcon,
  CheckIcon,
  DeleteIcon,
  DeploymentStepFailedIcon,
  DeploymentStepFinishedIcon,
  DeploymentStepPendingIcon,
  ProviderIcon,
} from "@/utils/icons"
import { capitalize, formatTimestamp } from "@/utils/helpers"
import { DeploymentBadge } from "../DeploymentBadge"
import { ModalEnum, setModal } from "@/store/global"
import { setDeleteDeploymentId } from "@/store/firebird"
import { useConnectToProvider } from "@/hooks/firebird/use-connect-to-provider"
import { selectActiveProvider } from "@/store/providers"
import {
  DeploymentEvents,
  DeploymentEventType,
} from "@/hooks/use-deployment-status-stream"
import Loading from "@/components/Loading"
import classNames from "classnames"

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
  deploymentStatus,
  deploymentProgress,
}: {
  deployment: IFirebirdDeployment
  deploymentStatus: DeploymentStatus | undefined
  deploymentProgress: Map<DeploymentEvents, DeploymentEventType>
}) {
  const activeProvider = useAppSelector(selectActiveProvider)
  const isDeploymentActive = deployment.status === DeploymentStatus.ACTIVE
  const isDeploymentPending =
    deployment.status === DeploymentStatus.PENDING ||
    deployment.status === DeploymentStatus.DEPLOYING

  const chain = deployment.config.chain
  const machines = deployment.config.machines
  const status = deployment.status

  return (
    <div
      data-testid="selected-deployment-card"
      className="relative flex w-full flex-col gap-3 rounded-md border border-slate-100 p-3"
    >
      <div className="flex w-full items-center justify-start gap-8 px-4 py-6">
        <DeploymentIcon instanceName={machines.instance_name} />

        <DeploymentInfo
          instanceName={machines.instance_name}
          createdAt={deployment.created_at}
          deployment={deployment}
          isDeploymentActive={isDeploymentActive}
          activeProvider={activeProvider}
        />

        <DeploymentBadges
          status={deploymentStatus || status}
          chainVersion={chain.version}
          chainId={chain.chain_id}
        />

        {isDeploymentPending && (
          <DeploymentStatusStream
            status={deploymentStatus}
            progress={deploymentProgress}
          />
        )}
      </div>

      {isDeploymentActive && (
        <DeleteDeploymentButton deploymentId={deployment.id} />
      )}
    </div>
  )
}

const DeploymentIcon = ({ instanceName }: { instanceName: string }) => (
  <div className="flex h-24 w-24 items-center justify-center rounded-md border border-slate-100 bg-white p-2">
    <Image src="/images/kwil.png" alt={instanceName} width={40} height={40} />
  </div>
)

const DeploymentInfo = ({
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
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-medium">{instanceName}</h1>
      </div>
      <div className="text-xs text-slate-500">{formatTimestamp(createdAt)}</div>
      {isDeploymentActive && (
        <ConnectToProviderButton
          deployment={deployment}
          isActiveProvider={activeProvider === machines.instance_name}
        />
      )}
    </div>
  )
}

const DeploymentBadges = ({
  status,
  chainVersion,
  chainId,
}: {
  status: DeploymentStatus
  chainVersion: string
  chainId: string
}) => (
  <div className="flex flex-row items-center justify-start gap-2 text-xs text-slate-500">
    <DeploymentBadge info="Status" size="lg">
      <div
        className={`h-2 w-2 rounded-full border border-slate-100 ${statusColor[status]}`}
      />
      <span>{capitalize(status)}</span>
    </DeploymentBadge>

    <DeploymentBadge info="KwilD" size="lg">
      <Image
        src="/images/kwil.png"
        className="h-4 w-4"
        alt={chainVersion}
        width={16}
        height={16}
      />
      <span>{chainVersion}</span>
    </DeploymentBadge>

    <DeploymentBadge info="Chain ID" size="lg">
      <ChainIcon className="h-4 w-4" />
      <span className="whitespace-nowrap">{chainId}</span>
    </DeploymentBadge>
  </div>
)

const ConnectToProviderButton = ({
  deployment,
  isActiveProvider,
}: {
  deployment: IFirebirdDeployment
  isActiveProvider: boolean
}) => {
  const { connectToProvider } = useConnectToProvider({
    providerEndpoint: deployment.service_endpoints?.kwil_rpc_provider || "",
    instanceName: deployment.config.machines.instance_name || "",
    chainId: deployment.config.chain.chain_id || "",
  })

  if (isActiveProvider) {
    return (
      <button
        className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md border border-kwil bg-white p-2 text-xs text-kwil"
        onClick={connectToProvider}
      >
        <CheckIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">Connected</span>
      </button>
    )
  }

  return (
    <button
      className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md border border-slate-100 bg-kwil p-2 text-xs text-slate-50"
      onClick={connectToProvider}
    >
      <ProviderIcon className="h-4 w-4" />
      <span className="whitespace-nowrap">Connect</span>
    </button>
  )
}

const DeleteDeploymentButton = ({ deploymentId }: { deploymentId: string }) => {
  const dispatch = useAppDispatch()

  const triggerDeleteDeploymentModal = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    dispatch(setModal(ModalEnum.DELETE_DEPLOYMENT))
    dispatch(setDeleteDeploymentId(deploymentId))
  }

  return (
    <button
      className="absolute right-3 top-3 flex cursor-pointer rounded-lg border border-slate-100 p-1 text-slate-600 hover:border-slate-300 hover:text-slate-900"
      onClick={triggerDeleteDeploymentModal}
    >
      <DeleteIcon className="h-4 w-4" />
    </button>
  )
}

const DeploymentStatusStream = ({
  status,
  progress,
}: {
  status: DeploymentStatus | undefined
  progress: Map<DeploymentEvents, DeploymentEventType>
}) => {
  console.log("Progress", progress)
  if (status === DeploymentStatus.ACTIVE) return

  const eventDisplayNames = {
    [DeploymentEvents.INIT_KEY_PAIR]: "Initializing Key Pair",
    [DeploymentEvents.CREATE_INSTANCE]: "Creating Instance",
    [DeploymentEvents.WAIT_INSTANCE_READY]: "Starting Instance",
    [DeploymentEvents.INSTALL_KWILD]: "Installing Kwil Daemon",
    [DeploymentEvents.REGISTER_DOMAIN]: "Registering Domain",
    [DeploymentEvents.FINALIZE_DEPLOYMENT]: "Finalizing Deployment",
  }

  return (
    <div className="ml-16 flex flex-col gap-2 text-sm">
      {Array.from(progress.entries()).map(([event, eventType]) => (
        <div className="flex flex-row items-center gap-2" key={event}>
          <span
            className={classNames({
              flex: eventType === DeploymentEventType.NOT_STARTED,
              hidden: eventType !== DeploymentEventType.NOT_STARTED,
            })}
          >
            <DeploymentStepPendingIcon className="h-4 w-4" />
          </span>

          <span
            className={classNames({
              flex: eventType === DeploymentEventType.START,
              hidden: eventType !== DeploymentEventType.START,
            })}
          >
            <Loading className="h-4 w-4" />
          </span>

          <span
            className={classNames("text-kwil", {
              flex: eventType === DeploymentEventType.FINISH,
              hidden: eventType !== DeploymentEventType.FINISH,
            })}
          >
            <DeploymentStepFinishedIcon className="h-4 w-4" />
          </span>

          <span
            className={classNames("text-red-500", {
              flex: eventType === DeploymentEventType.FAIL,
              hidden: eventType !== DeploymentEventType.FAIL,
            })}
          >
            <DeploymentStepFailedIcon className="h-4 w-4" />
          </span>

          <span>{eventDisplayNames[event]}</span>
        </div>
      ))}
    </div>
  )
}
