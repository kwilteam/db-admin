import { Step } from "../Step"
import { DeploymentOptionCard } from "../DeploymentOptionCard"
import { VmStepIcon } from "@/utils/icons"
import { MachineType } from "@/store/firebird"

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
    description: "For small applications.",
    optionValue: MachineType.small,
    enterprise: true,
  },
  {
    title: "Medium",
    cpu: "4 vCPU",
    ram: "4 GB Ram",
    storage: "40 GB storage",
    description: "For growing applications.",
    optionValue: MachineType.medium,
    enterprise: true,
  },
  {
    title: "Large",
    cpu: "8 vCPU",
    ram: "8 GB Ram",
    storage: "80 GB storage",
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
            optionKey="machines"
            optionValue={option.optionValue}
            enterprise={option.enterprise}
          >
            <span className="text-xl tracking-tighter">{option.title}</span>
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
