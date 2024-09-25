import { Step } from "../Step"
import { DeploymentOptionCard } from "../DeploymentOptionCard"
import { NetworkStepIcon, StepIcon } from "@/utils/icons"
import { Network } from "@/utils/firebird/types"

const networkOptions = [
  {
    testId: "testnet-option",
    optionValue: Network.testnet,
    title: "Testnet",
    subtitle: "Kwil Testnet",
    enterprise: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    testId: "mainnet-option",
    optionValue: Network.mainnet,
    title: "Mainnet",
    subtitle: "Kwil Mainnet",
    enterprise: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
]

export function NetworkStep() {
  return (
    <Step
      step={1}
      icon={<StepIcon />}
      title="Select a Network"
      description="Select a network to deploy to."
    >
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {networkOptions.map((option) => (
          <DeploymentOptionCard
            key={option.testId}
            testId={option.testId}
            optionKey="network"
            optionValue={option.optionValue}
            enterprise={option.enterprise}
          >
            <span className="flex flex-row items-center gap-2 text-xl tracking-tighter">
              <NetworkStepIcon /> {option.title}
            </span>
            <span className="text-sm">{option.subtitle}</span>
            <div className="mt-3 text-xs">{option.description}</div>
          </DeploymentOptionCard>
        ))}
      </div>
    </Step>
  )
}
