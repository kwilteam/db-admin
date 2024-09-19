import { IFirebirdDeployment } from "@/utils/firebird/types"
import Tabs from "../../Tabs"
import Config from "./Config"
import Nodes from "./Nodes"
import { ConfigIcon, NodesIcon } from "@/utils/icons"
import { useAppSelector } from "@/store/hooks"
import { selectDeploymentNodesById } from "@/store/firebird"

export default function ActiveDeploymentTabs({
  deploymentId,
  activeDeployment,
}: {
  deploymentId: string
  activeDeployment: IFirebirdDeployment
}) {
  const nodes = useAppSelector(selectDeploymentNodesById(deploymentId))
  const nodesCount = nodes?.length
  const nodesTabName = nodesCount ? `Nodes (${nodesCount})` : "Nodes"

  return (
    <div
      data-testid="active-deployment-tabs"
      className="flex w-full rounded-md border border-slate-100"
    >
      <Tabs
        tabs={[
          {
            id: "nodes",
            name: nodesTabName,
            component: <Nodes deploymentId={deploymentId} />,
            icon: NodesIcon,
          },
          {
            id: "config",
            name: "Config",
            component: <Config config={activeDeployment.config} />,
            icon: ConfigIcon,
          },
        ]}
      />
    </div>
  )
}
