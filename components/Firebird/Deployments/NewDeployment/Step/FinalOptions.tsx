import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  IFirebirdFinalOptions,
  selectNewDeployment,
  setNewDeploymentFinalOptions,
} from "@/store/firebird"
import Loading from "@/components/Loading"
import { DeployIcon } from "@/utils/icons"
import { TalkWithTeam } from "./TalkWithTeam"
import useDeploymentState from "@/hooks/firebird/use-deployment-state"
import useTriggerDeployment from "@/hooks/firebird/use-trigger-deployment"

export function FinalOptionsStep() {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)
  const { readyToDeploy, setDeploying, deploying, talkWithTeam } =
    useDeploymentState(newDeployment)
  const { triggerDeployNetwork } = useTriggerDeployment(newDeployment)

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
    <div className="mr-2 flex w-full flex-row gap-2">
      {talkWithTeam ? (
        <TalkWithTeam />
      ) : (
        <>
          <AccessCodeInput
            value={newDeployment?.finalOptions?.accessCode ?? ""}
            onChange={handleChange}
          />

          <InviteOtherValidators />

          <DeployButton
            readyToDeploy={readyToDeploy}
            deploying={deploying}
            onClick={() => triggerDeployNetwork(setDeploying)}
          />
        </>
      )}
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

const InviteOtherValidators = () => (
  <div className="ml-4 flex flex-row items-center justify-center gap-2 opacity-50">
    <input
      type="checkbox"
      className="cursor-not-allowed rounded border border-gray-300 bg-white p-3"
      id="inviteOtherValidators"
      name="inviteOtherValidators"
      disabled
    />
    <label htmlFor="inviteOtherValidators">Invite other validators?</label>
    <p className="text-xs text-gray-500">Coming soon.</p>
  </div>
)

const DeployButton = ({
  readyToDeploy,
  deploying,
  onClick,
}: {
  readyToDeploy: boolean
  deploying: boolean
  onClick: () => void
}) => (
  <div className="flex flex-grow items-center justify-end gap-2">
    <button
      className="text-md m-1 flex flex-row items-center rounded-lg bg-kwil px-4 py-3 tracking-tight text-white disabled:cursor-not-allowed disabled:opacity-50"
      disabled={!readyToDeploy || deploying}
      onClick={onClick}
    >
      {deploying ? (
        <Loading className="flex justify-center" color="white" />
      ) : (
        <>
          <DeployIcon className="mr-2 h-5 w-5" /> Deploy Kwil Network
        </>
      )}
    </button>
  </div>
)
