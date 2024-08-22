import { NetworkStep } from "./Step/Network"
import { NetworkSettingsStep } from "./Step/NetworkSettings"
import { NumberOfNodesStep } from "./Step/NumberOfNodes"
import { VmStep } from "./Step/Vm"

export function NewDeploymentForm() {
  return (
    <>
      <NetworkStep />
      <NetworkSettingsStep />
      <NumberOfNodesStep />
      <VmStep />
    </>
  )
}
