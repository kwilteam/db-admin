import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectActiveDeployment, setActiveDeployment } from "@/store/firebird"
import { getDeployment } from "@/utils/firebird/api"
import { DeploymentStatus, IFirebirdDeployment } from "@/utils/firebird/types"
import useDeploymentStatusWebSocket from "@/hooks/use-deployment-status-ws"
import Loading from "@/components/Loading"
import SelectedDeploymentCard from "./SelectedDeploymentCard"
import QuickConnect from "./QuickConnect"
import ActiveDeploymentTabs from "./ActiveDeploymentTabs"

export default function ExistingDeployment({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const activeDeployment = useAppSelector(selectActiveDeployment)
  // const deploymentStatus = useDeploymentStatusWebSocket(
  //   id,
  //   activeDeployment?.status || DeploymentStatus.PENDING,
  // )

  const chain = activeDeployment?.config.chain
  const providerEndpoint =
    activeDeployment?.service_endpoints?.kwil_rpc_provider

  useEffect(() => {
    const loadAsync = async () => {
      const { status, data } = await getDeployment(id)

      if (status === 200 && data) {
        dispatch(setActiveDeployment(data))
      } else if (status === 404) {
        dispatch(setActiveDeployment(undefined))
        router.push("/firebird/deployments")
      } else {
        console.error("Failed to fetch deployment", status, data)
      }
    }

    loadAsync()

    return () => {
      dispatch(setActiveDeployment(undefined))
    }
  }, [id, dispatch, router])

  console.log(activeDeployment, "activeDeployment")
  // console.log(deploymentStatus, "WS deploymentStatus")

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
        <SelectedDeploymentCard deployment={activeDeployment} />
      </div>
      <div className="mx-2 flex h-screen flex-row gap-2">
        <div className="flex h-24 w-full flex-col items-start gap-2 lg:w-1/2">
          {activeDeployment.status === DeploymentStatus.ACTIVE && (
            <ActiveDeploymentTabs
              deploymentId={id}
              activeDeployment={activeDeployment}
            />
          )}
        </div>

        <div className="flex w-full flex-col gap-2 lg:w-1/2">
          {activeDeployment.status === DeploymentStatus.ACTIVE &&
            providerEndpoint &&
            chain && (
              <QuickConnect providerEndpoint={providerEndpoint} chain={chain} />
            )}
        </div>
      </div>
    </>
  )
}
