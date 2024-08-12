import {
  IFirebirdNewDeployment,
  selectNewDeployment,
  setCurrentStep,
  setNewDeployment,
} from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import classNames from "classnames"

interface IDeploymentOptionCardProps {
  title: string
  subtitle: string
  description: string
  optionKey: keyof IFirebirdNewDeployment
  optionValue: string | number | boolean
  talkWithTeam?: boolean
}

export function DeploymentOptionCard({
  title,
  subtitle,
  description,
  optionKey,
  optionValue,
  talkWithTeam,
}: IDeploymentOptionCardProps) {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)
  const isSelected = newDeployment && newDeployment[optionKey] === optionValue

  const setDeploymentValue = () => {
    if (talkWithTeam) return

    dispatch(setNewDeployment({ key: optionKey, value: optionValue }))
    dispatch(setCurrentStep(2))
  }

  const _classNames = classNames(
    "flex flex-grow cursor-pointer select-none flex-row gap-2 rounded-md border",
    {
      "hover:border-kwil/60 hover:bg-kwil/5": !talkWithTeam && !isSelected,
      "border-kwil/80 bg-kwil/10": isSelected,
      "border-slate-200 bg-slate-50/70": !isSelected,
    },
  )

  return (
    <div className={_classNames} onClick={setDeploymentValue}>
      <div className="flex flex-col gap-1">
        <div
          className={classNames("flex flex-col gap-1 p-3", {
            "cursor-not-allowed": talkWithTeam,
          })}
        >
          <span
            className={classNames("text-xl tracking-tighter", {
              "text-slate-400": talkWithTeam,
              "text-slate-700": !talkWithTeam,
            })}
          >
            {title}
          </span>
          <span
            className={classNames("text-sm", {
              "text-slate-400": talkWithTeam,
              "text-slate-600": !talkWithTeam,
            })}
          >
            {subtitle}
          </span>
          <div
            className={classNames("mt-3 text-xs", {
              "text-slate-400": talkWithTeam,
              "text-slate-600": !talkWithTeam,
            })}
          >
            {description}
          </div>
        </div>
        {talkWithTeam && <TalkWithTeam />}
      </div>
    </div>
  )
}

export function TalkWithTeam() {
  return (
    <div className="flex select-none flex-row items-center rounded-b-md border-t border-slate-200 bg-slate-50 p-1 text-slate-700">
      <div className="flex flex-grow flex-col pl-2">
        <span className="text-xs text-slate-600">
          Schedule a call with our team to discuss your deployment.
        </span>
      </div>
      <button className="m-1 rounded-md bg-kwil px-3 py-2 text-sm text-slate-50">
        Talk with team
      </button>
    </div>
  )
}
