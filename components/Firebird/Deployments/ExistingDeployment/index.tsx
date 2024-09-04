import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectActiveDeployment, setActiveDeployment } from "@/store/firebird"
import { getDeployment } from "@/utils/firebird/api"
import { DeploymentStatus } from "@/utils/firebird/types"
import useDeploymentStatusWebSocket from "@/hooks/use-deployment-status-ws"
import Loading from "@/components/Loading"
import SelectedDeploymentCard from "./SelectedDeploymentCard"
import Tabs from "../../Tabs"
import KwilCliConnect from "./KwilCliConnect"
import JsSdkConnect from "./JsSdkConnect"
import Nodes from "./Nodes"
import Services from "./Services"

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
            <div className="flex w-full rounded-md border border-slate-100">
              <Tabs
                tabs={[
                  { name: "Nodes", component: <Nodes deploymentId={id} /> },
                  {
                    name: "Services",
                    component: <Services deploymentId={id} />,
                  },
                ]}
              />
            </div>
          )}
        </div>

        {activeDeployment.status === DeploymentStatus.ACTIVE &&
          providerEndpoint &&
          chain && (
            <div className="flex flex-col justify-start gap-2 lg:w-1/2">
              <div className="rounded-md border border-slate-100">
                <Tabs
                  tabs={[
                    {
                      name: "Kwil CLI",
                      component: (
                        <KwilCliConnect
                          providerEndpoint={providerEndpoint}
                          chain={chain}
                        />
                      ),
                    },
                    {
                      name: "JavaScript",
                      component: (
                        <JsSdkConnect
                          providerEndpoint={providerEndpoint}
                          chain={chain}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          )}
      </div>
    </>
  )
}
