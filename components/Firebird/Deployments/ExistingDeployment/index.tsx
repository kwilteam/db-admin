import { useAppSelector } from "@/store/hooks"
import useEventStream from "@/hooks/firebird/use-event-stream"
import { selectSelectedDeployment } from "@/store/firebird"
import { DeploymentStatus } from "@/utils/firebird/types"
import Loading from "@/components/Loading"
import SelectedDeployment from "./SelectedDeployment"
import QuickConnect from "./QuickConnect"
import SelectedDeploymentTabs from "./SelectedDeploymentTabs"
import useGetDeployment from "@/hooks/firebird/use-get-deployment"

export default function ExistingDeployment({ id }: { id: string }) {
  const selectedDeployment = useAppSelector(selectSelectedDeployment)
  const isDeploymentActive =
    selectedDeployment?.status === DeploymentStatus.ACTIVE

  const eventStream = useEventStream(id, selectedDeployment?.status)
  useGetDeployment(id, eventStream.status)

  const chain = selectedDeployment?.config.chain
  const providerEndpoint =
    selectedDeployment?.service_endpoints?.kwil_rpc_provider

  if (!selectedDeployment) {
    return (
      <div className="flex w-full justify-center pt-4">
        <Loading />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-col items-start gap-2">
        <SelectedDeployment
          deployment={selectedDeployment}
          eventStream={eventStream}
        />
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex flex-col items-start gap-2 lg:w-1/2">
          {isDeploymentActive && (
            <SelectedDeploymentTabs
              deploymentId={id}
              selectedDeployment={selectedDeployment}
            />
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-1/2">
          {isDeploymentActive && providerEndpoint && chain && (
            <QuickConnect providerEndpoint={providerEndpoint} chain={chain} />
          )}
        </div>
      </div>
    </div>
  )
}
