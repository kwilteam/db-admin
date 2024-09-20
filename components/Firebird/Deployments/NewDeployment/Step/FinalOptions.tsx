import { useCallback } from "react"
import { Montserrat } from "next/font/google"
import classNames from "classnames"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  IFirebirdFinalOptions,
  selectNewDeployment,
  setNewDeploymentFinalOptions,
} from "@/store/firebird"
import Loading from "@/components/Loading"
import { DeployIcon, StepIcon } from "@/utils/icons"
import { TalkWithTeam } from "./TalkWithTeam"
import useDeploymentState from "@/hooks/firebird/use-deployment-state"
import useTriggerDeployment from "@/hooks/firebird/use-trigger-deployment"

const heading = Montserrat({
  weight: "500",
  subsets: ["latin"],
})

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
    <div className="mr-2 flex w-full flex-row items-center gap-2">
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
  <div className="ml-3 flex flex-grow flex-row items-center gap-3">
    <StepIcon className="hidden h-4 w-4 lg:block" />
    <h2
      className={classNames({
        [heading.className]: true,
        "hidden text-xl leading-tight tracking-tighter text-slate-700 lg:block":
          true,
      })}
    >
      Access Code
    </h2>
    <p className="hidden text-sm text-gray-500 lg:block">
      This is the access code given to you by the team.
    </p>
    <input
      autoComplete="off"
      id="accessCode"
      name="accessCode"
      type="text"
      placeholder="Enter access code"
      required
      className="flex flex-grow rounded-md border-0 py-2 text-center text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80 sm:placeholder-transparent"
      value={value}
      onChange={(e) => onChange("accessCode", e.target.value)}
    />
  </div>
)

const InviteOtherValidators = () => (
  <div className="ml-4 hidden flex-row items-center justify-center gap-2 opacity-50 lg:flex">
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
  <div className="flex items-center justify-end gap-2 lg:flex-grow">
    <button
      className="text-md m-1 flex flex-row items-center rounded-lg bg-kwil p-2 tracking-tight text-white disabled:cursor-not-allowed disabled:opacity-50 lg:px-4 lg:py-3"
      disabled={!readyToDeploy || deploying}
      onClick={onClick}
    >
      {deploying ? (
        <Loading className="flex justify-center" color="white" />
      ) : (
        <>
          <DeployIcon className="h-5 w-5 lg:mr-2" />
          <span className="hidden lg:block">Deploy Kwil Network</span>
        </>
      )}
    </button>
  </div>
)
