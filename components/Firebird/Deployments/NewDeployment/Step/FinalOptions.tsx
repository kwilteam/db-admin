import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  IFirebirdFinalOptions,
  selectNewDeployment,
  setNewDeploymentFinalOptions,
} from "@/store/firebird"
import { DeployIcon } from "@/utils/icons"
import { Step } from "../Step"

export function FinalOptionsStep() {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)
  const [readyToDeploy, setReadyToDeploy] = useState(false)

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

  return (
    <Step
      step={6}
      icon={<DeployIcon />}
      title="Final options"
      description="Finalize your deployment."
    >
      <div className="flex flex-col gap-2">
        <AccessCodeInput
          value={newDeployment?.finalOptions?.accessCode ?? ""}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary rounded-lg bg-kwil p-2 text-lg font-semibold tracking-tight text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!readyToDeploy}
        >
          Deploy New Kwil Network
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
      htmlFor="chainId"
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
