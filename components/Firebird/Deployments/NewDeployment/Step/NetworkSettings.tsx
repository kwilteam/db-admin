import { useCallback } from "react"
import { Step } from "../Step"
import { DeploymentOptionInput } from "../DeploymentOptionInput"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  IFirebirdNetworkSettings,
  IFirebirdNewDeployment,
  selectNewDeployment,
  setCurrentStep,
  setNewDeploymentObject,
} from "@/store/firebird"
import { NetworkSettingsStepIcon } from "@/utils/icons"
import { DeploymentOptionDropdown } from "../DeploymentOptionDropdown"

export function NetworkSettingsStep() {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)

  const isStepComplete = useCallback(
    (
      updatedNetworkSettings:
        | IFirebirdNetworkSettings
        | undefined = newDeployment?.networkSettings,
    ) => {
      return (
        updatedNetworkSettings?.chainId &&
        updatedNetworkSettings?.chainId.length > 0 &&
        updatedNetworkSettings?.kwilVersion &&
        updatedNetworkSettings?.kwilVersion.length > 0 &&
        updatedNetworkSettings?.companyName &&
        updatedNetworkSettings?.companyName.length > 0
      )
    },
    [newDeployment],
  )

  const handleChange = useCallback(
    (
      parentKey: keyof IFirebirdNewDeployment,
      valueKey: keyof IFirebirdNewDeployment[keyof IFirebirdNewDeployment],
      value: string,
    ) => {
      const updatedNetworkSettings = {
        ...newDeployment?.networkSettings,
        [valueKey]: value,
      }

      dispatch(
        setNewDeploymentObject({
          key: parentKey,
          propertyKey: valueKey,
          value: value,
        }),
      )

      if (isStepComplete(updatedNetworkSettings)) {
        dispatch(setCurrentStep(3))
      } else {
        dispatch(setCurrentStep(2))
      }
    },
    [newDeployment, isStepComplete, dispatch],
  )

  return (
    <Step
      step={2}
      icon={<NetworkSettingsStepIcon />}
      title="Network settings"
      description="Decide on the settings you require for your deployment."
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

        <DeploymentOptionDropdown
          title="Kwil Version"
          description="The Kwil version you want to deploy on."
          parentKey="networkSettings"
          propertyKey="kwilVersion"
          options={["", "0.8.4"]}
          defaultValue=""
          handleChange={handleChange}
        />

        <DeploymentOptionInput
          title="Company Name"
          description="Your company name."
          parentKey="networkSettings"
          propertyKey="companyName"
          handleChange={handleChange}
        />
      </div>
    </Step>
  )
}
