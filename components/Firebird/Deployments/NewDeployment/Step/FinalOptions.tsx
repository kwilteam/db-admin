import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  IFirebirdFinalOptions,
  selectNewDeployment,
  setNewDeploymentFinalOptions,
} from "@/store/firebird"
import { deployNetwork } from "@/utils/firebird/api"
import { setAlert } from "@/store/global"
import Loading from "@/components/Loading"
import { IFirebirdNewDeployment } from "@/utils/firebird/types"
import { DeployIcon } from "@/utils/icons"

export function FinalOptionsStep() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const newDeployment = useAppSelector(selectNewDeployment)
  const [readyToDeploy, setReadyToDeploy] = useState(false)
  const [deploying, setDeploying] = useState(false)

  useEffect(() => {
    const accessCode = newDeployment?.finalOptions?.accessCode
    const hexRegex = /^[0-9a-fA-F]{32}$/
    if (accessCode && hexRegex.test(accessCode)) {
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

  const formatNewDeploymentData = (): IFirebirdNewDeployment => {
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

  const isValidAccessCode = (accessCode: string) => {
    return accessCode.length >= 10
  }

  return (
    <div className="mr-2 flex w-full flex-row gap-2">
      {/* Button for “invite other validators” that is disabled out and says, “Coming soon”. */}

      <AccessCodeInput
        value={newDeployment?.finalOptions?.accessCode ?? ""}
        onChange={handleChange}
      />

      <div className="flex flex-grow items-center justify-end gap-2">
        <button
          className="btn btn-primary text-md flex flex-row items-center rounded-lg bg-kwil p-2 font-semibold tracking-tight text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!readyToDeploy || deploying}
          onClick={triggerDeployNetwork}
        >
          {deploying ? (
            <Loading className="flex justify-center" color="white" />
          ) : (
            <>
              <DeployIcon className="mr-2 h-4 w-4" /> Deploy Kwil Network
            </>
          )}
        </button>
      </div>
    </div>
  )
}

type InputProps = {
  value: string | undefined
  onChange: (key: keyof IFirebirdFinalOptions, value: string) => void
}

const AccessCodeInput = ({ value, onChange }: InputProps) => (
  <div className="ml-3 flex flex-row items-center gap-3">
    <label
      htmlFor="accessCode"
      className="block text-sm font-medium leading-6 text-gray-700"
    >
      Access Code
    </label>
    <p className="text-sm text-gray-500">
      This is the access code given to you by the team.
    </p>
    <input
      autoComplete="off"
      id="accessCode"
      name="accessCode"
      type="text"
      required
      className="block w-72 rounded-md border-0 py-1 text-center text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
      value={value}
      onChange={(e) => onChange("accessCode", e.target.value)}
    />
  </div>
)
