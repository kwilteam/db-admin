import { useState, useEffect, useCallback } from "react"
import Loading from "@/components/Loading"
import {
  downloadServiceLogs,
  getNodes,
  getNodeServices,
} from "@/utils/firebird/api"
import {
  IFirebirdApiNode,
  IFirebirdApiService,
  NodeStatus,
} from "@/utils/firebird/types"
import { capitalize } from "@/utils/helpers"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectActiveDeploymentNodeId,
  setActiveDeploymentNodeId,
} from "@/store/firebird"
import classNames from "classnames"
import { CloseIcon, DeleteIcon, DownloadLogsIcon } from "@/utils/icons"

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
  const dispatch = useAppDispatch()
  const activeNodeId = useAppSelector(selectActiveDeploymentNodeId)
  const [openNodeIds, setOpenNodeIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [nodes, setNodes] = useState<IFirebirdApiNode[] | undefined>(undefined)

  const toggleNodeOpen = useCallback((nodeId: string) => {
    setOpenNodeIds((prevOpenNodeIds) => {
      const newOpenNodeIds = new Set(prevOpenNodeIds)
      if (newOpenNodeIds.has(nodeId)) {
        newOpenNodeIds.delete(nodeId)
      } else {
        newOpenNodeIds.add(nodeId)
      }
      return newOpenNodeIds
    })
  }, [])

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

    return () => {
      dispatch(setActiveDeploymentNodeId(undefined))
    }
  }, [deploymentId, dispatch])

  if (!nodes) {
    return <Loading className="mb-1" />
  }

  const setActiveNode = (nodeId: string) => {
    if (activeNodeId === nodeId) {
      dispatch(setActiveDeploymentNodeId(undefined))
    } else {
      dispatch(setActiveDeploymentNodeId(nodeId))
    }
  }

  // TODO: allow node to be deleted

  return (
    <div className="flex w-full flex-col gap-2">
      {!loading && nodes && !nodes.length && (
        <div className="text-sm text-slate-500">No nodes found</div>
      )}

      {nodes &&
        nodes.map((node, index) => (
          <>
            <div
              key={node.id}
              className={classNames(
                "relative flex grow cursor-pointer select-none flex-col gap-2 rounded-md border border-slate-100 p-2",
                {
                  "bg-kwil/25": openNodeIds.has(node.id),
                  "bg-slate-50/30": !openNodeIds.has(node.id),
                },
              )}
              onClick={() => toggleNodeOpen(node.id)}
            >
              <div className="absolute right-2 top-2 cursor-pointer p-1">
                <DeleteIcon className="h-4 w-4" />
              </div>
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
              {openNodeIds.has(node.id) && <NodeServices nodeId={node.id} />}
            </div>
          </>
        ))}
    </div>
  )
}

const NodeServices = ({ nodeId }: { nodeId: string }) => {
  const [services, setServices] = useState<IFirebirdApiService[] | undefined>(
    undefined,
  )
  const [loading, setLoading] = useState(true)
  const [downloadingLogs, setDownloadingLogs] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true)
      const { status, data } = await getNodeServices(nodeId)
      if (status === 200 && data) {
        setServices(data)
      }
      setLoading(false)
    }

    fetchServices()
  }, [nodeId])

  const downloadLogs = async (
    e: React.MouseEvent<HTMLDivElement>,
    serviceId: string,
    serviceName: string,
  ) => {
    e.stopPropagation()
    setDownloadingLogs((prevDownloadingLogs) => {
      const newDownloadingLogs = new Set(prevDownloadingLogs)
      newDownloadingLogs.add(serviceId)
      return newDownloadingLogs
    })
    try {
      const { status, data, message } = await downloadServiceLogs(serviceId)
      if (status === 200 && data) {
        // Create a Blob with the log data
        const blob = new Blob([data], { type: "text/plain;charset=utf-8" })

        // Use the browser's download capability
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `${serviceName}_logs.txt`)

        // Append to the document, trigger the download, and clean up
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        console.error("Failed to download logs", status, message)
      }
    } catch (error) {
      console.error("Error downloading logs", error)
    }
    setDownloadingLogs((prevDownloadingLogs) => {
      const newDownloadingLogs = new Set(prevDownloadingLogs)
      newDownloadingLogs.delete(serviceId)
      return newDownloadingLogs
    })
  }

  return (
    <div className="flex cursor-default flex-col justify-start gap-2 rounded-md border border-slate-100 bg-white p-2">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Services</h3>
        {loading && <Loading className="mb-1" />}
        {!loading && services && !services.length && (
          <div className="text-xs">No services found</div>
        )}

        {!loading &&
          services &&
          services.map((service) => (
            <div
              key={service.id}
              className="flex flex-row items-center gap-1 rounded-md border border-slate-100 p-2"
            >
              <h3 className="flex grow flex-row items-center gap-2 text-sm font-medium">
                <span>{service.name}</span>
                <div
                  className={`h-2 w-2 rounded-full border border-slate-100 ${statusColor[service.running ? NodeStatus.RUNNING : NodeStatus.STOPPED]}`}
                />
                <span className="text-xs text-slate-500">
                  {capitalize(
                    service.running ? NodeStatus.RUNNING : NodeStatus.STOPPED,
                  )}
                </span>
              </h3>
              <div
                className="cursor-pointer text-xs text-slate-500"
                onClick={(e) => {
                  downloadLogs(e, service.id, service.name)
                }}
              >
                {downloadingLogs.has(service.id) ? (
                  <Loading className="mr-1 h-4 w-4" />
                ) : (
                  <DownloadLogsIcon className="mr-1 h-5 w-5" />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
