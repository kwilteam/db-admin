import { Step } from "../Step"
import { DeploymentOptionCard } from "../DeploymentOptionCard"
import { VmStepIcon } from "@/utils/icons"
import {
  MachineType,
  selectNewDeployment,
  setCurrentStep,
} from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useEffect } from "react"

const machinesOptions: Array<{
  title: string
  subtitle: string
  description: string
  optionValue: MachineType
  enterprise: boolean
}> = [
  {
    title: "Mini",
    subtitle: "1 vCPU\n1 GB Ram\n10 GB storage",
    description: "For development and testing.",
    optionValue: MachineType.mini,
    enterprise: false,
  },
  {
    title: "Small",
    subtitle: "2 vCPU\n2 GB Ram\n20 GB storage",
    description: "For small applications.",
    optionValue: MachineType.small,
    enterprise: true,
  },
  {
    title: "Medium",
    subtitle: "4 vCPU\n4 GB Ram\n40 GB storage",
    description: "For growing applications.",
    optionValue: MachineType.medium,
    enterprise: true,
  },
  {
    title: "Large",
    subtitle: "8 vCPU\n8 GB Ram\n80 GB storage",
    description: "For enterprise applications.",
    optionValue: MachineType.large,
    enterprise: true,
  },
]

export function MachinesStep() {
  return (
    <Step
      step={4}
      icon={<VmStepIcon />}
      title="Select a Machine"
      description="Choose the machine you want to deploy to."
    >
      <div className="grid grid-cols-2 gap-2">
        {machinesOptions.map((option) => (
          <DeploymentOptionCard
            key={option.title}
            step={4}
            title={option.title}
            subtitle={option.subtitle}
            description={option.description}
            optionKey="machines"
            optionValue={option.optionValue}
            enterprise={option.enterprise}
          />
        ))}
      </div>
    </Step>
  )
}
