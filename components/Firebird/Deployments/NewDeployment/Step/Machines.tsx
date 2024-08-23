import { Step } from "../Step"
import { DeploymentOptionCard } from "../DeploymentOptionCard"
import { VmStepIcon } from "@/utils/icons"
import {
  IFirebirdMachines,
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
  optionValue: IFirebirdMachines
  talkWithTeam: boolean
}> = [
  {
    title: "Mini",
    subtitle: "1 vCPU\n1 GB Ram\n10 GB storage",
    description: "For development and testing.",
    optionValue: {
      type: MachineType.mini,
      provider: "aws",
      region: "us-east-2",
    },
    talkWithTeam: false,
  },
  {
    title: "Small",
    subtitle: "2 vCPU\n2 GB Ram\n20 GB storage",
    description: "For small applications.",
    optionValue: {
      type: MachineType.small,
      provider: "aws",
      region: "us-east-2",
    },
    talkWithTeam: true,
  },
  {
    title: "Medium",
    subtitle: "4 vCPU\n4 GB Ram\n40 GB storage",
    description: "For growing applications.",
    optionValue: {
      type: MachineType.medium,
      provider: "aws",
      region: "us-east-2",
    },
    talkWithTeam: true,
  },
  {
    title: "Large",
    subtitle: "8 vCPU\n8 GB Ram\n80 GB storage",
    description: "For enterprise applications.",
    optionValue: {
      type: MachineType.large,
      provider: "aws",
      region: "us-east-2",
    },
    talkWithTeam: true,
  },
]

export function MachinesStep() {
  const dispatch = useAppDispatch()
  const newDeployment = useAppSelector(selectNewDeployment)

  useEffect(() => {
    if (newDeployment?.machines?.type && newDeployment?.nodeCount === 1) {
      dispatch(setCurrentStep(5))
    }
  }, [newDeployment?.machines, dispatch, newDeployment?.nodeCount])

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
            talkWithTeam={option.talkWithTeam}
          />
        ))}
      </div>
    </Step>
  )
}
