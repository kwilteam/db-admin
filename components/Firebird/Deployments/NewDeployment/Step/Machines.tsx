import { Step } from "../Step"
import { DeploymentOptionCard } from "../DeploymentOptionCard"
import { StepIcon, VmStepIcon } from "@/utils/icons"
import { MachineType } from "@/utils/firebird/types"

export function MachinesStep() {
  return (
    <Step
      step={4}
      icon={<StepIcon color="red" />}
      title="Select a Machine"
      description="Choose the machine you want to deploy to."
    >
      <div
        className="grid grid-cols-1 gap-2 lg:grid-cols-2"
        data-testid="machine-options"
      >
        {machinesOptions.map((option) => (
          <DeploymentOptionCard
            key={option.title}
            optionKey="machines"
            optionValue={option.optionValue}
            enterprise={option.enterprise}
            testId={`machine-option-${option.optionValue}`}
          >
            <span className="flex flex-row items-center gap-2 text-xl tracking-tighter">
              <VmStepIcon /> {option.title}
            </span>
            <div className="flex flex-row gap-2">
              <span className="rounded-md border border-slate-200 bg-slate-50/50 px-1 text-sm">
                {option.cpu}
              </span>
              <span className="rounded-md border border-slate-200 bg-slate-50/50 px-1 text-sm">
                {option.ram}
              </span>
              <span className="rounded-md border border-slate-200 bg-slate-50/50 px-1 text-sm">
                {option.storage}
              </span>
            </div>
            <div className="mt-3 text-xs">{option.description}</div>
          </DeploymentOptionCard>
        ))}
      </div>
    </Step>
  )
}

const machinesOptions: Array<{
  title: string
  cpu: string
  ram: string
  storage: string
  description: string
  optionValue: MachineType
  enterprise: boolean
}> = [
  {
    title: "Mini",
    cpu: "1 vCPU",
    ram: "1 GB Ram",
    storage: "10 GB storage",
    description: "For development and testing.",
    optionValue: MachineType.mini,
    enterprise: false,
  },
  {
    title: "Small",
    cpu: "2 vCPU",
    ram: "2 GB Ram",
    storage: "20 GB storage",
    description: "For small protocols.",
    optionValue: MachineType.small,
    enterprise: true,
  },
  {
    title: "Medium",
    cpu: "4 vCPU",
    ram: "4 GB Ram",
    storage: "40 GB storage",
    description: "For growing protocols.",
    optionValue: MachineType.medium,
    enterprise: true,
  },
  {
    title: "Large",
    cpu: "8 vCPU",
    ram: "8 GB Ram",
    storage: "80 GB storage",
    description: "For enterprise protocols.",
    optionValue: MachineType.large,
    enterprise: true,
  },
]
