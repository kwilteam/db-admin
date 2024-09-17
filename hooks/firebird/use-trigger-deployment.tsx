import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/hooks"
import { clearNewDeployment, IFirebirdNewDeployment } from "@/store/firebird"
import { deployNetwork } from "@/utils/firebird/api"
import { IFirebirdApiNewDeployment } from "@/utils/firebird/types"
import { setAlert } from "@/store/global"

const FORWARD_DELAY = 1500

export default function useTriggerDeployment(
  newDeployment: IFirebirdNewDeployment | undefined,
) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const formatNewDeploymentData = (): IFirebirdApiNewDeployment | undefined => {
    if (
      !newDeployment?.networkSettings.chainId ||
      !newDeployment?.networkSettings.kwilVersion ||
      !newDeployment?.nodeCount ||
      !newDeployment?.networkSettings.companyName ||
      !newDeployment?.machines ||
      !newDeployment?.finalOptions?.accessCode
    ) {
      return undefined
    }

    return {
      chain: {
        chain_id: newDeployment.networkSettings.chainId,
        version: newDeployment.networkSettings.kwilVersion,
      },
      node_count: newDeployment.nodeCount,
      machines: {
        instance_name: newDeployment.networkSettings.companyName,
        provider: "aws",
        region: "us-east-2",
        type: newDeployment.machines,
      },
      access_token: newDeployment.finalOptions.accessCode,
    }
  }

  const deploymentSuccess = (id: string) => {
    dispatch(
      setAlert({
        type: "success",
        text: "Your network is being deployed...",
      }),
    )

    setTimeout(() => {
      router.push(`/firebird/deployments/${id}`)
      dispatch(clearNewDeployment)
    }, FORWARD_DELAY)
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
    if (!apiData) {
      setDeploying(false)
      dispatch(
        setAlert({
          type: "error",
          text: "There was an error deploying your network. Please check your access code and contact the team if the problem persists.",
        }),
      )
      return
    }

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
