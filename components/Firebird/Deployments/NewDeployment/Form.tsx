import { NetworkStep } from "./Step/Network"
import { NetworkSettingsStep } from "./Step/NetworkSettings"
import { NumberOfNodesStep } from "./Step/NumberOfNodes"
import { MachinesStep } from "./Step/Machines"
import { ServicesStep } from "./Step/Services"
import { CancelNewDeployment } from "./CancelNewDeployment"

export function NewDeploymentForm() {
  return (
    <>
      <CancelNewDeployment />
      <NetworkStep />
      <NetworkSettingsStep />
      <NumberOfNodesStep />
      <MachinesStep />
      <ServicesStep />
    </>
  )
}
