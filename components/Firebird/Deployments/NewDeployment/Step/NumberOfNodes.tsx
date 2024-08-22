import { useState } from "react"
import {
  IFirebirdNewDeployment,
  setCurrentStep,
  setNewDeploymentObject,
} from "@/store/firebird"
import { useAppDispatch } from "@/store/hooks"
import { NumberOfNodesStepIcon } from "@/utils/icons"
import { Step } from "../Step"
import { DeploymentOptionDropdown } from "../DeploymentOptionDropdown"

export function NumberOfNodesStep() {
  const dispatch = useAppDispatch()
  const [talkWithTeam, setTalkWithTeam] = useState<boolean>(false)

  const handleChange = (
    parentKey: keyof IFirebirdNewDeployment,
    valueKey: keyof IFirebirdNewDeployment[keyof IFirebirdNewDeployment],
    value: string,
  ) => {
    const numberOfNodes = Number(value)
    setTalkWithTeam(numberOfNodes > 1)

    dispatch(
      setNewDeploymentObject({
        key: parentKey,
        propertyKey: valueKey,
        value: numberOfNodes,
      }),
    )

    if (numberOfNodes === 1) {
      dispatch(setCurrentStep(4))
    } else {
      dispatch(setCurrentStep(3))
    }
  }

  return (
    <Step
      step={3}
      icon={<NumberOfNodesStepIcon />}
      title="Number of nodes"
      description="The number of nodes you want to deploy."
    >
      <div className="flex flex-col gap-2">
        <DeploymentOptionDropdown
          title=""
          description=""
          parentKey="networkSettings"
          propertyKey="numberOfNodes"
          options={["", "1", "2", "3", "4"]}
          defaultValue=""
          handleChange={handleChange}
        />
      </div>
      {talkWithTeam && <div>talk</div>}
    </Step>
  )
}
