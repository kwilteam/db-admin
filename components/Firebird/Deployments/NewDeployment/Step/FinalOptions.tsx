import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  IFirebirdFinalOptions,
  selectNewDeployment,
  setNewDeploymentFinalOptions,
} from "@/store/firebird"
import { DeployIcon } from "@/utils/icons"
import { Step } from "../Step"
import { deployNetwork } from "@/utils/firebird/api"
import { setAlert } from "@/store/global"
import Loading from "@/components/Loading"
import { IFirebirdApiDeploymentConfig } from "@/utils/firebird/types"

export function FinalOptionsStep() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const newDeployment = useAppSelector(selectNewDeployment)
  const [readyToDeploy, setReadyToDeploy] = useState(false)
  const [deploying, setDeploying] = useState(false)

  useEffect(() => {
    const accessCode = newDeployment?.finalOptions?.accessCode
    if (accessCode && accessCode.length >= 10) {
      setReadyToDeploy(true)
    } else {
      setReadyToDeploy(false)
    }
  }, [newDeployment?.finalOptions])

  const handleChange = useCallback(
    (valueKey: keyof IFirebirdFinalOptions, value: string) => {
      dispatch(
        setNewDeploymentFinalOptions({
          key: valueKey,
          value: value,
        }),
      )
    },
    [dispatch],
  )

  const triggerDeployNetwork = async () => {
    setDeploying(true)
    // Prepare the data to be ready to be sent to the API
    const apiData = formatNewDeploymentData()

    // Send the data to the API
    const { data, status } = await deployNetwork(apiData)

    if (status === 200 && data) {
      const { id } = data

      if (!id) {
        deploymentError()
        return
      }

      deploymentSuccess(id)
    } else {
      deploymentError()
    }
  }

  const deploymentSuccess = (id: string) => {
    // Show a success message
    dispatch(
      setAlert({
        type: "success",
        text: "Your network is being deployed. You will be redirected to the deployment page shortly...",
      }),
    )
    // Redirect to the deployment page
    setTimeout(() => {
      router.push(`/firebird/deployments/${id}`)
    }, 5000)
  }

  const deploymentError = () => {
    dispatch(
      setAlert({
        type: "error",
        text: "There was an error deploying your network. Please check your access code and contact the team if the problem persists.",
      }),
    )
    setDeploying(false)
  }

  const formatNewDeploymentData = (): IFirebirdApiDeploymentConfig => {
    return {
      chain: {
        chain_id: newDeployment?.networkSettings.chainId ?? "",
        version: newDeployment?.networkSettings.kwilVersion ?? "",
      },
      node_count: newDeployment?.nodeCount ?? 0,
      machines: {
        instance_name: newDeployment?.networkSettings.companyName ?? "",
        provider: newDeployment?.machines.provider ?? "",
        region: newDeployment?.machines.region ?? "",
        type: newDeployment?.machines.type ?? "",
      },
      access_token: newDeployment?.finalOptions?.accessCode ?? "",
    }
  }

  return (
    <Step
      step={6}
      icon={<DeployIcon />}
      title="Final options"
      description="Finalize your deployment."
    >
      <div className="flex flex-col gap-2">
        {/* Button for “invite other validators” that is disabled out and says, “Coming soon”. */}

        <AccessCodeInput
          value={newDeployment?.finalOptions?.accessCode ?? ""}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary h-12 items-center rounded-lg bg-kwil p-2 text-lg font-semibold tracking-tight text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!readyToDeploy || deploying}
          onClick={triggerDeployNetwork}
        >
          {deploying ? (
            <Loading className="flex justify-center" color="white" />
          ) : (
            "Deploy New Kwil Network"
          )}
        </button>
      </div>
    </Step>
  )
}

type InputProps = {
  value: string | undefined
  onChange: (key: keyof IFirebirdFinalOptions, value: string) => void
}

const AccessCodeInput = ({ value, onChange }: InputProps) => (
  <div>
    <label
      htmlFor="accessCode"
      className="block text-sm font-medium leading-6 text-gray-700"
    >
      Access Code
    </label>
    <p className="text-sm text-gray-500">
      This is the access code given to you by the team.
    </p>
    <div className="mt-2">
      <input
        autoComplete="off"
        id="accessCode"
        name="accessCode"
        type="text"
        required
        className="block w-full rounded-md border-0 py-1.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
        value={value}
        onChange={(e) => onChange("accessCode", e.target.value)}
      />
    </div>
  </div>
)
