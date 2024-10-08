import classNames from "classnames"
import { selectNewDeployment, setNewDeployment } from "@/store/firebird"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ModalEnum, setModal } from "@/store/global"
import { IFirebirdNewDeployment } from "@/utils/firebird/types"

interface IDeploymentOptionCardProps<K extends keyof IFirebirdNewDeployment> {
  children: React.ReactNode
  optionKey: K
  optionValue: IFirebirdNewDeployment[K]
  enterprise?: boolean
  testId?: string
}

export function DeploymentOptionCard<K extends keyof IFirebirdNewDeployment>({
  children,
  optionKey,
  optionValue,
  enterprise,
  testId,
}: IDeploymentOptionCardProps<K>) {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)

  const isSelected = newDeployment && newDeployment[optionKey] === optionValue

  const setDeploymentValue = () => {
    dispatch(setNewDeployment({ key: optionKey, value: optionValue }))

    if (enterprise) {
      dispatch(setModal(ModalEnum.TALK_WITH_TEAM))
    }
  }

  const _classNames = classNames(
    "flex flex-grow cursor-pointer select-none flex-row gap-2 rounded-md border",
    {
      "hover:border-sky-700/50 hover:bg-sky-500/5": !enterprise && !isSelected,
      "border-sky-700/50 bg-sky-500/5": isSelected,
      "border-slate-200 bg-slate-50/70": !isSelected,
      "text-slate-400": enterprise,
      "text-slate-700": !enterprise,
    },
  )

  return (
    <div
      className={_classNames}
      onClick={setDeploymentValue}
      data-testid={testId}
    >
      <div className="relative flex w-full flex-col gap-1">
        {enterprise && (
          <div className="absolute right-1 top-1 rounded-md bg-sky-500 px-2 py-1 text-xs text-white">
            Enterprise
          </div>
        )}

        <div className="flex flex-col gap-1 p-3">{children}</div>
      </div>
    </div>
  )
}
