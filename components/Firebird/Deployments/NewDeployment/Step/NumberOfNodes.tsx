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

const numberOfNodesOptions = ["", "1", "2", "3", "4", "5"]

export function NumberOfNodesStep() {
  const dispatch = useAppDispatch()
  const newDeploymentObject = useAppSelector(selectNewDeployment)
  const currentStep = useAppSelector(selectCurrentStep)
  const [talkWithTeam, setTalkWithTeam] = useState<boolean>(false)

  const handleChange = (value: string) => {
    const numberOfNodes = Number(value)

    dispatch(
      setNewDeployment({
        key: "numberOfNodes",
        value: numberOfNodes,
      }),
    )
  }

  useEffect(() => {
    console.log(newDeploymentObject?.numberOfNodes, "number of nodes changed")
    const numberOfNodes = Number(newDeploymentObject?.numberOfNodes)

    if (numberOfNodes === 1) {
      dispatch(setCurrentStep(4))
    } else if (numberOfNodes === 0 && currentStep >= 3) {
      dispatch(setCurrentStep(3))
    } else if (numberOfNodes > 1) {
      dispatch(setCurrentStep(3))
    }

    setTalkWithTeam(numberOfNodes > 1)
  }, [dispatch, newDeploymentObject?.numberOfNodes, currentStep])

  return (
    <Step
      step={3}
      icon={<NumberOfNodesStepIcon />}
      title="Number of nodes"
      description="The number of nodes you want to deploy."
    >
      <div className="flex flex-col gap-2">
        <div>
          <label
            htmlFor="kwilVersion"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Kwil Version
          </label>
          <p className="text-sm text-gray-500">
            The Kwil version you want to deploy.
          </p>
          <div className="mt-2">
            <select
              id="numberOfNodes"
              name="numberOfNodes"
              required
              className="block w-full rounded-md border-0 py-1.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
              value={newDeploymentObject?.numberOfNodes}
              onChange={(e) => handleChange(e.target.value)}
            >
              {numberOfNodesOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
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
