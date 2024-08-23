import {
  IFirebirdNewDeployment,
  selectNewDeployment,
  selectCurrentStep,
  setCurrentStep,
  setNewDeployment,
} from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import classNames from "classnames"
import { TalkWithTeam } from "./Step/TalkWithTeam"

interface IDeploymentOptionCardProps<K extends keyof IFirebirdNewDeployment> {
  step: number
  title: string
  subtitle?: string
  description: string
  optionKey: K
  optionValue: IFirebirdNewDeployment[K]
  talkWithTeam?: boolean
}

export function DeploymentOptionCard<K extends keyof IFirebirdNewDeployment>({
  step,
  title,
  subtitle,
  description,
  optionKey,
  optionValue,
  talkWithTeam,
}: IDeploymentOptionCardProps<K>) {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)
  const currentStep = useAppSelector(selectCurrentStep)
  const isSelected = newDeployment && newDeployment[optionKey] === optionValue

  const setDeploymentValue = () => {
    if (talkWithTeam) return

    dispatch(setNewDeployment({ key: optionKey, value: optionValue }))

    if (currentStep === step) {
      dispatch(setCurrentStep(step + 1))
    }
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
      <div className="flex w-full flex-col gap-1">
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
