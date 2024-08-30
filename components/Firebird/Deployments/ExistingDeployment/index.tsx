import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectActiveDeployment, setActiveDeployment } from "@/store/firebird"
import { getDeployment } from "@/utils/firebird/api"
import Loading from "@/components/Loading"
import SelectedDeploymentCard from "./SelectedDeploymentCard"
import Tabs from "../../Tabs"
import KwilCliConnect from "./KwilCliConnect"
import JsSdkConnect from "./JsSdkConnect"
import Config from "./Config"
import Nodes from "./Nodes"
import Services from "./Services"

export default function ExistingDeployment({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const activeDeployment = useAppSelector(selectActiveDeployment)

  const chain = activeDeployment?.config.chain
  const providerEndpoint = activeDeployment?.endpoints.chain

  useEffect(() => {
    const loadAsync = async () => {
      const { status, data } = await getDeployment(id)

      if (status === 200 && data) {
        dispatch(setActiveDeployment(data))
      }
    }

    loadAsync()

    return () => {
      dispatch(setActiveDeployment(undefined))
    }
  }, [id, dispatch])

  console.log(activeDeployment, "activeDeployment")

  if (!activeDeployment) {
    return (
      <div className="flex w-full justify-center pt-4">
        <Loading />
      </div>
    )
  }

  return (
    <div className="m-2 flex h-screen flex-row gap-2">
      <div className="flex h-24 w-full flex-col items-start gap-2 lg:w-1/2">
        <SelectedDeploymentCard deployment={activeDeployment} />

        <div className="flex w-full rounded-md border border-slate-100">
          <Tabs
            tabs={[
              { name: "Nodes", component: <Nodes deploymentId={id} /> },
              { name: "Services", component: <Services deploymentId={id} /> },
              {
                name: "Config",
                component: <Config />,
              },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col justify-start gap-2 lg:w-1/2">
        <div className="rounded-md border border-slate-100">
          {providerEndpoint && chain && (
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
          )}
        </div>
      </div>
    </div>
  )
}
