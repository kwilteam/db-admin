import { Step } from "../Step"
import { DeploymentOptionCard } from "../DeploymentOptionCard"
import { NetworkStepIcon } from "@/utils/icons"
import { Network } from "@/store/firebird"

export function NetworkStep() {
  return (
    <Step
      step={1}
      icon={<NetworkStepIcon />}
      title="Select a network"
      description="Select a network to deploy to."
    >
      <div className="grid grid-cols-2 gap-2">
        <DeploymentOptionCard
          step={1}
          title="Testnet"
          subtitle="Kwil Testnet"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          optionKey="network"
          optionValue={Network.testnet}
        />

        <DeploymentOptionCard
          step={1}
          title="Mainnet"
          subtitle="Kwil Mainnet"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          optionKey="network"
          optionValue={Network.mainnet}
          enterprise
        />
      </div>
    </Step>
  )
}
