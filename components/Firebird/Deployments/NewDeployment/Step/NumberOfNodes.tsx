import { Step } from "../Step"
import { DeploymentOptionCard } from "../DeploymentOptionCard"
import { DeploymentOptionInput } from "../DeploymentOptionInput"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  IFirebirdNewDeployment,
  selectNewDeployment,
  setCurrentStep,
  setNewDeploymentObject,
} from "@/store/firebird"

export function NumberOfNodesStep() {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)

  const handleChange = (
    parentKey: keyof IFirebirdNewDeployment,
    valueKey: keyof IFirebirdNewDeployment[keyof IFirebirdNewDeployment],
    value: string,
  ) => {
    console.log(parentKey, valueKey, value, "handleChange")
    dispatch(
      setNewDeploymentObject({
        key: parentKey,
        propertyKey: valueKey,
        value: value,
      }),
    )
  }

  return (
    <Step
      step={3}
      title="Number of nodes"
      description="Decide on the number of nodes you want to deploy."
    >
      {/* <div className="flex w-full flex-row gap-2">{children}</div> */}
      <div className="flex flex-col gap-2">
        <DeploymentOptionInput
          title="Chain Id"
          description="The chain Id of the network you want to deploy on."
          parentKey="networkSettings"
          propertyKey="chainId"
          handleChange={handleChange}
        />
      </div>
    </Step>
  )
}
