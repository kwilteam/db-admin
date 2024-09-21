import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import useDeploymentStatusStream from "@/hooks/firebird/use-deployment-status-stream"
import {
  selectSelectedDeployment,
  setSelectedDeployment,
} from "@/store/firebird"
import { getDeployment } from "@/utils/firebird/api"
import { DeploymentStatus } from "@/utils/firebird/types"
import Loading from "@/components/Loading"
import SelectedDeployment from "./SelectedDeployment"
import QuickConnect from "./QuickConnect"
import SelectedDeploymentTabs from "./SelectedDeploymentTabs"

export default function ExistingDeployment({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { deploymentStatus, deploymentProgress } = useDeploymentStatusStream(id)
  const selectedDeployment = useAppSelector(selectSelectedDeployment)
  const isDeploymentActive =
    selectedDeployment?.status === DeploymentStatus.ACTIVE

  const chain = selectedDeployment?.config.chain
  const providerEndpoint =
    selectedDeployment?.service_endpoints?.kwil_rpc_provider

  const loadAsync = useCallback(async () => {
    const { status, data } = await getDeployment(id)

    if (status === 200 && data) {
      dispatch(setSelectedDeployment(data))
    } else if (status === 404) {
      dispatch(setSelectedDeployment(undefined))
      router.push("/firebird/deployments")
    } else {
      console.error("Failed to fetch deployment", status, data)
    }
  }, [id, dispatch, router])

  useEffect(() => {
    loadAsync()

    return () => {
      dispatch(setSelectedDeployment(undefined))
    }
  }, [id, dispatch, router, loadAsync])

  useEffect(() => {
    if (deploymentStatus === DeploymentStatus.ACTIVE) {
      loadAsync()
    }
  }, [deploymentStatus, loadAsync])

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
          deploymentStatus={deploymentStatus}
          deploymentProgress={deploymentProgress}
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
