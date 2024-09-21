import Image from "next/image"
import { useAppSelector } from "@/store/hooks"
import { DeploymentStatus, IFirebirdDeployment } from "@/utils/firebird/types"
import { selectActiveProvider } from "@/store/providers"
import {
  DeploymentEvents,
  DeploymentEventType,
} from "@/hooks/firebird/use-deployment-status-stream"
import { DeploymentInfo } from "./DeploymentInfo"
import DeploymentBadges from "./DeploymentBadges"
import DeploymentStatusStream from "./DeploymentStatusStream"
import DeleteDeploymentButton from "./DeleteDeploymentButton"

export default function SelectedDeployment({
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
      className="relative flex w-full flex-col gap-3 rounded-md border border-slate-100 lg:p-3"
    >
      <div className="flex w-full flex-col items-center justify-start gap-3 p-3 lg:flex-row lg:gap-4 lg:px-4 lg:py-6">
        {/* <div÷className="flex lg:w-1/2 lg:gap-4"> */}
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
          status={deploymentStatus || status}
          chainVersion={chain.version}
          chainId={chain.chain_id}
        />
        {/* </div> */}

        <div className="flex flex-row items-center justify-start gap-4 lg:w-1/2 lg:gap-8">
          {isDeploymentPending && (
            <DeploymentStatusStream
              status={deploymentStatus}
              progress={deploymentProgress}
            />
          )}
        </div>
      </div>

      {isDeploymentActive && <DeleteDeploymentButton />}
    </div>
  )
}

const DeploymentIcon = ({ instanceName }: { instanceName: string }) => (
  <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-md border border-slate-100 bg-white p-2">
    <Image src="/images/kwil.png" alt={instanceName} width={40} height={40} />
  </div>
)
