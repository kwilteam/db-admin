import Image from "next/image"
import { useAppSelector } from "@/store/hooks"
import { DeploymentStatus, IFirebirdDeployment } from "@/utils/firebird/types"
import { selectActiveProvider } from "@/store/providers"
import { DeploymentEventType, EventStreamEvents } from "@/utils/firebird/types"
import { DeploymentEvents } from "@/hooks/firebird/use-deployment-event-stream"
import { DeploymentInfo } from "./DeploymentInfo"
import DeploymentBadges from "./DeploymentBadges"
import DeploymentStatusStream from "./DeploymentStatusStream"
import DeleteDeploymentButton from "./DeleteDeploymentButton"
import { ChevronLeftIcon } from "@/utils/icons"
import { useRouter } from "next/navigation"
import StatusStream from "./StatusStream"

export default function SelectedDeployment({
  deployment,
  deploymentEventStream,
  eventStream,
}: {
  deployment: IFirebirdDeployment
  deploymentEventStream: {
    status: DeploymentStatus | undefined
    progress: Map<DeploymentEvents, DeploymentEventType>
  }
  eventStream: {
    status: DeploymentStatus | undefined
    progress: Map<EventStreamEvents, DeploymentEventType>
  }
}) {
  const activeProvider = useAppSelector(selectActiveProvider)

  const isDeploymentActive = deployment.status === DeploymentStatus.ACTIVE

  const isDeploymentPending =
    deployment.status === DeploymentStatus.PENDING ||
    deployment.status === DeploymentStatus.DEPLOYING

  const isDeploymentStartingOrStopping =
    deployment.status === DeploymentStatus.STARTING ||
    deployment.status === DeploymentStatus.STOPPING

  const chain = deployment.config.chain
  const machines = deployment.config.machines
  const status = deployment.status

  return (
    <div
      data-testid="selected-deployment-card"
      className="relative flex w-full flex-col gap-3 rounded-md border border-slate-100 lg:p-3"
    >
      <div className="flex w-full flex-col items-center justify-start gap-3 p-3 lg:flex-row lg:gap-4 lg:px-4 lg:py-6">
        <div className="flex w-full flex-row items-center justify-start gap-3 lg:w-auto lg:gap-4">
          <DeploymentIcon instanceName={machines.instance_name} />

          <DeploymentInfo
            instanceName={machines.instance_name}
            createdAt={deployment.created_at}
            deployment={deployment}
            isDeploymentActive={isDeploymentActive}
            activeProvider={activeProvider}
          />
        </div>

        <DeploymentBadges
          status={deploymentEventStream.status || status}
          chainVersion={chain.version}
          chainId={chain.chain_id}
        />

        <div className="flex flex-row items-center justify-start gap-4 lg:w-1/2 lg:gap-8">
          {isDeploymentPending && (
            <DeploymentStatusStream
              status={deploymentEventStream.status || status}
              progress={deploymentEventStream.progress}
            />
          )}

          {isDeploymentStartingOrStopping && (
            <StatusStream
              status={eventStream.status || status}
              progress={eventStream.progress}
            />
          )}
        </div>
      </div>

      {isDeploymentActive && <DeleteDeploymentButton />}
      <BackToDeployments />
    </div>
  )
}

const DeploymentIcon = ({ instanceName }: { instanceName: string }) => (
  <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-md border border-slate-100 bg-white p-2">
    <Image src="/images/kwil.png" alt={instanceName} width={40} height={40} />
  </div>
)

const BackToDeployments = () => {
  const router = useRouter()

  const backToDeployments = () => {
    router.push("/firebird/deployments")
  }

  return (
    <div
      className="absolute -left-1 -top-1 hidden cursor-pointer flex-row items-center justify-start gap-2 hover:underline lg:ml-3 lg:mt-3 lg:flex"
      onClick={backToDeployments}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-400">
        <ChevronLeftIcon className="h-4 w-4" />
      </div>
    </div>
  )
}
