import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/hooks"
import { clearNewDeployment, IFirebirdNewDeployment } from "@/store/firebird"
import { deployNetwork } from "@/utils/firebird/api"
import { IFirebirdApiNewDeployment } from "@/utils/firebird/types"
import { setAlert } from "@/store/global"

export default function useTriggerDeployment(
  newDeployment: IFirebirdNewDeployment | undefined,
) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const formatNewDeploymentData = (): IFirebirdApiNewDeployment => ({
    chain: {
      chain_id: newDeployment?.networkSettings.chainId ?? "",
      version: newDeployment?.networkSettings.kwilVersion ?? "",
    },
    node_count: newDeployment?.nodeCount ?? 0,
    machines: {
      instance_name:
        newDeployment?.networkSettings.companyName ?? "kwil-db-network",
      provider: "aws",
      region: "us-east-2",
      type: newDeployment?.machines ?? "",
    },
    access_token: newDeployment?.finalOptions?.accessCode ?? "",
  })

  const deploymentSuccess = (id: string) => {
    dispatch(
      setAlert({
        type: "success",
        text: "Your network is being deployed. You will be redirected to the deployment page shortly...",
      }),
    )

    setTimeout(() => {
      router.push(`/firebird/deployments/${id}`)
      dispatch(clearNewDeployment)
    }, 5000)
  }

  const deploymentError = () => {
    dispatch(
      setAlert({
        type: "error",
        text: "There was an error deploying your network. Please check your access code and contact the team if the problem persists.",
      }),
    )
  }

  const triggerDeployNetwork = async (
    setDeploying: (deploying: boolean) => void,
  ) => {
    setDeploying(true)
    const apiData = formatNewDeploymentData()
    const { data, status } = await deployNetwork(apiData)

    if (status === 200 && data?.id) {
      deploymentSuccess(data.id)
    } else {
      deploymentError()
      setDeploying(false)
    }
  }

  return { triggerDeployNetwork }
}
