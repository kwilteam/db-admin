import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectActiveDeployment, setActiveDeployment } from "@/store/firebird"
import { getDeployment } from "@/utils/firebird/api"
import { DeploymentStatus } from "@/utils/firebird/types"
import Loading from "@/components/Loading"
import SelectedDeploymentCard from "./SelectedDeploymentCard"
import QuickConnect from "./QuickConnect"
import ActiveDeploymentTabs from "./ActiveDeploymentTabs"
import useDeploymentStatusStream from "@/hooks/use-deployment-status-stream"

export default function ExistingDeployment({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { deploymentStatus, deploymentProgress } = useDeploymentStatusStream(id)
  const activeDeployment = useAppSelector(selectActiveDeployment)
  const isDeploymentActive =
    activeDeployment?.status === DeploymentStatus.ACTIVE

  const chain = activeDeployment?.config.chain
  const providerEndpoint =
    activeDeployment?.service_endpoints?.kwil_rpc_provider

  const loadAsync = useCallback(async () => {
    const { status, data } = await getDeployment(id)

    if (status === 200 && data) {
      dispatch(setActiveDeployment(data))
    } else if (status === 404) {
      dispatch(setActiveDeployment(undefined))
      router.push("/firebird/deployments")
    } else {
      console.error("Failed to fetch deployment", status, data)
    }
  }, [id, dispatch, router])

  useEffect(() => {
    loadAsync()

    return () => {
      dispatch(setActiveDeployment(undefined))
    }
  }, [id, dispatch, router, loadAsync])

  useEffect(() => {
    if (deploymentStatus === DeploymentStatus.ACTIVE) {
      loadAsync()
    }
  }, [deploymentStatus, loadAsync])

  if (!activeDeployment) {
    return (
      <div className="flex w-full justify-center pt-4">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className="m-2 flex flex-col items-start gap-2">
        <SelectedDeploymentCard
          deployment={activeDeployment}
          deploymentStatus={deploymentStatus}
          deploymentProgress={deploymentProgress}
        />
      </div>
      <div className="mx-2 flex h-screen flex-row gap-2">
        <div className="flex h-24 w-full flex-col items-start gap-2 lg:w-1/2">
          {isDeploymentActive && (
            <ActiveDeploymentTabs
              deploymentId={id}
              activeDeployment={activeDeployment}
            />
          )}
        </div>

        <div className="flex w-full flex-col gap-2 lg:w-1/2">
          {isDeploymentActive && providerEndpoint && chain && (
            <QuickConnect providerEndpoint={providerEndpoint} chain={chain} />
          )}
        </div>
      </div>
    </>
  )
}
