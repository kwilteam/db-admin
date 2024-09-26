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
      "A testnet Kwil Network is a network that is used for testing purposes. A testnet is separate from the mainnet and is used to test new features and updates before they are deployed to the mainnet. Inactive testnet networks are deleted after 30 days.",
  },
  {
    testId: "mainnet-option",
    optionValue: Network.mainnet,
    title: "Mainnet",
    subtitle: "Kwil Mainnet",
    enterprise: true,
    description:
      "A mainnet Kwil Network is a production-ready network that is used for deploying and managing decentralized databases. Mainnet Kwil chains can integrate custom gas tokens, utilize Kwil extensions, and implement custom consensus and governance mechanisms.",
  },
]

export function NetworkStep() {
  return (
    <Step
      step={1}
      icon={<StepIcon />}
      title="Network Type" 
      description="Select a type of network to deploy."
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
