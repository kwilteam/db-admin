import { useState, useEffect } from "react"
import Loading from "@/components/Loading"
import { getNodes } from "@/utils/firebird/api"
import { IFirebirdApiNode, NodeStatus } from "@/utils/firebird/types"
import { capitalize } from "@/utils/helpers"

export const statusColor = {
  [NodeStatus.PENDING]: "bg-blue-500/80",
  [NodeStatus.RUNNING]: "bg-emerald-500/80",
  [NodeStatus.FAILED]: "bg-red-500/80",
  [NodeStatus.STOPPING]: "bg-orange-500/80",
  [NodeStatus.STOPPED]: "bg-orange-500/80",
  [NodeStatus.SHUTTING_DOWN]: "bg-orange-500/80",
  [NodeStatus.TERMINATED]: "bg-red-500/80",
}

export default function Nodes({ deploymentId }: { deploymentId: string }) {
  const [loading, setLoading] = useState(true)

  const [nodes, setNodes] = useState<IFirebirdApiNode[] | undefined>(undefined)

  useEffect(() => {
    const fetchNodes = async () => {
      setLoading(true)
      const { status, data } = await getNodes(deploymentId)
      if (status === 200 && data) {
        setNodes(data)
      } else if (status === 404) {
        setNodes([])
      } else {
        setNodes([])
        console.error("Failed to fetch nodes", status, data)
      }
    }

    setLoading(false)
    fetchNodes()
  }, [deploymentId])

  if (!nodes) {
    return <Loading className="mb-1" />
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {!loading && nodes && !nodes.length && (
        <div className="text-sm text-slate-500">No nodes found</div>
      )}

      {nodes &&
        nodes.map((node, index) => (
          <div
            key={node.id}
            className="flex grow cursor-pointer select-none flex-col gap-2 rounded-md border border-slate-100 bg-slate-50/30 p-2 hover:border-slate-100 hover:bg-slate-50/60"
          >
            <h2 className="flex flex-row items-center gap-2 text-sm font-medium">
              <span>Node #{index + 1}</span>
              <div
                className={`h-2 w-2 rounded-full border border-slate-100 ${statusColor[node.status]}`}
              />
              <span className="text-xs text-slate-500">
                {capitalize(node.status)}
              </span>
            </h2>
            <div className="text-sm">{node.name}</div>
            <div className="flex flex-row gap-3">
              <div className="flex flex-row gap-1">
                <span className="text-xs font-bold text-slate-500">
                  Private IP:
                </span>
                <span className="text-xs text-slate-500">
                  {node?.private_ip?.length > 0 ? node.private_ip : "-"}
                </span>
              </div>
              <div className="flex flex-row gap-1">
                <span className="text-xs font-bold text-slate-500">
                  Public IP:
                </span>
                <span className="text-xs text-slate-500">
                  {node?.public_ip?.length > 0 ? node.public_ip : "-"}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
