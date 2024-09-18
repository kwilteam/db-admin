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
          testId="testnet-option"
          optionKey="network"
          optionValue={Network.testnet}
        >
          <span className="flex flex-row items-center gap-2 text-xl tracking-tighter">
            <NetworkStepIcon /> Testnet
          </span>
          <span className="text-sm">Kwil Testnet</span>
          <div className="mt-3 text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </div>
        </DeploymentOptionCard>

        <DeploymentOptionCard
          testId="mainnet-option"
          optionKey="network"
          optionValue={Network.mainnet}
          enterprise
        >
          <span className="flex flex-row items-center gap-2 text-xl tracking-tighter">
            <NetworkStepIcon /> Mainnet
          </span>
          <span className="text-sm">Kwil Mainnet</span>
          <div className="mt-3 text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </div>
        </DeploymentOptionCard>
      </div>
    </Step>
  )
}
