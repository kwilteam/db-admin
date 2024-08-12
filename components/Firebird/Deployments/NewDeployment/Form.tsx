import { NetworkStep } from "./Step/Network"
import { NetworkSettingsStep } from "./Step/NetworkSettings"
import { NumberOfNodesStep } from "./Step/NumberOfNodes"

export function NewDeploymentForm() {
  return (
    <>
      <NetworkStep />
      <NetworkSettingsStep />
      <NumberOfNodesStep />
    </>
  )
}
