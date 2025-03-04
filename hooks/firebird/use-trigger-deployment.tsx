import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/hooks"
import { resetNewDeployment } from "@/store/firebird"
import { deployNetwork } from "@/utils/firebird/api"
import {
  IFirebirdApiNewDeployment,
  IFirebirdFinalOptions,
  IFirebirdNetworkSettings,
  IFirebirdNewDeployment,
  RequiredNetworkSettings,
} from "@/utils/firebird/types"
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
      !newDeployment?.networkSettings.dbOwner ||
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
        db_owner: newDeployment.networkSettings.dbOwner,
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

  const findMissingField = (): string => {
    // return the first missing field in the order of the form
    for (const key in newDeployment?.networkSettings) {
      console.log(newDeployment.networkSettings[key as keyof IFirebirdNetworkSettings])
      if (newDeployment.networkSettings[key as keyof IFirebirdNetworkSettings] === '' || newDeployment.networkSettings[key as keyof IFirebirdNetworkSettings] === undefined) {
        return key
      }
    }


    if (!newDeployment?.nodeCount) {
      return "nodeCount"
    }

    if (!newDeployment?.machines) {
      return "machines"
    }

    for (const key in newDeployment?.finalOptions) {
      if (newDeployment.finalOptions[key as keyof IFirebirdFinalOptions] === undefined) {
        return key
      }
    }

    return ""
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
      dispatch(resetNewDeployment())
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
      const missingField = findMissingField();
      const fieldName = RequiredNetworkSettings[missingField]

      if(fieldName) {
        dispatch(
          setAlert({
            type: "error",
            text: `Cannot deploy network. Please configure the ${fieldName} field.`,
          }),
        )
        return
        
      }

      dispatch(
        setAlert({
          type: "error",
          text: `Cannot deploy network. Please ensure all fields are filled out.`,
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
