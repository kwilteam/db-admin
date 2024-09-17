import { IFirebirdDeployment } from "@/utils/firebird/types"
import Tabs from "../../Tabs"
import Config from "./Config"
import Nodes from "./Nodes"

export default function ActiveDeploymentTabs({
  deploymentId,
  activeDeployment,
}: {
  deploymentId: string
  activeDeployment: IFirebirdDeployment
}) {
  return (
    <div
      data-testid="active-deployment-tabs"
      className="flex w-full rounded-md border border-slate-100"
    >
      <Tabs
        tabs={[
          { name: "Nodes", component: <Nodes deploymentId={deploymentId} /> },
          {
            name: "Config",
            component: <Config config={activeDeployment.config} />,
          },
        ]}
      />
    </div>
  )
}
