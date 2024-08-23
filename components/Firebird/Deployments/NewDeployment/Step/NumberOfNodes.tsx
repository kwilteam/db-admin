import { useEffect, useState } from "react"
import {
  selectCurrentStep,
  selectNewDeployment,
  setCurrentStep,
  setNewDeployment,
} from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { NumberOfNodesStepIcon } from "@/utils/icons"
import { Step } from "../Step"
import { TalkWithTeamCard } from "../TalkWithTeamCard"

const nodeCountOptions = ["", "1", "2", "3", "4", "5"]

export function NumberOfNodesStep() {
  const dispatch = useAppDispatch()
  const newDeploymentObject = useAppSelector(selectNewDeployment)
  const currentStep = useAppSelector(selectCurrentStep)
  const [talkWithTeam, setTalkWithTeam] = useState<boolean>(false)

  const handleChange = (value: string) => {
    const nodeCount = Number(value)

    dispatch(
      setNewDeployment({
        key: "nodeCount",
        value: nodeCount,
      }),
    )
  }

  useEffect(() => {
    const nodeCount = Number(newDeploymentObject?.nodeCount)
    const machineSelected = newDeploymentObject?.machines?.type

    if (nodeCount === 1 && machineSelected) {
      dispatch(setCurrentStep(5))
    } else if (nodeCount === 1 && !machineSelected) {
      dispatch(setCurrentStep(4))
    } else if (nodeCount === 0 && currentStep >= 3) {
      dispatch(setCurrentStep(3))
    } else if (nodeCount > 1) {
      dispatch(setCurrentStep(3))
    }

    setTalkWithTeam(nodeCount > 1)
  }, [
    dispatch,
    newDeploymentObject?.nodeCount,
    currentStep,
    newDeploymentObject?.machines?.type,
  ])

  return (
    <Step
      step={3}
      icon={<NumberOfNodesStepIcon />}
      title="Number of nodes"
      description="The number of nodes you want to deploy."
    >
      <div className="flex flex-col gap-2">
        <select
          id="nodeCount"
          name="nodeCount"
          required
          className="block w-full rounded-md border-0 py-1.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
          value={newDeploymentObject?.nodeCount}
          onChange={(e) => handleChange(e.target.value)}
        >
          {nodeCountOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {talkWithTeam && (
        <TalkWithTeamCard
          title="Talk with our team"
          subtitle="Talk with our team, so we can help you with your requirements."
        />
      )}
    </Step>
  )
}
