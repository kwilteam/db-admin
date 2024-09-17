import { useState, useCallback } from "react"
import classNames from "classnames"
import { IFirebirdApiNode, NodeStatus } from "@/utils/firebird/types"
import { ModalEnum, setModal, setModalData } from "@/store/global"
import { capitalize } from "@/utils/helpers"
import { useAppDispatch } from "@/store/hooks"
import { DeleteIcon } from "@/utils/icons"
import Loading from "@/components/Loading"
import useNodes from "@/hooks/firebird/use-nodes"
import NodeServices from "./NodeServices"

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
  const [openNodeIds, setOpenNodeIds] = useState<Set<string>>(new Set())
  const { loading, nodes } = useNodes(deploymentId)

  const toggleNodeOpen = useCallback((nodeId: string) => {
    setOpenNodeIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }, [])

  const triggerDeleteNode = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, nodeId: string) => {
      e.stopPropagation()
      dispatch(setModal(ModalEnum.DELETE_NODE))
      dispatch(setModalData({ nodeId, onlyNode: nodes?.length === 1 }))
    },
    [dispatch, nodes],
  )

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
          <NodeItem
            key={node.id}
            node={node}
            index={index}
            isOpen={openNodeIds.has(node.id)}
            onToggle={() => toggleNodeOpen(node.id)}
            onDelete={(e) => triggerDeleteNode(e, node.id)}
          />
        ))}
    </div>
  )
}

const NodeItem = ({
  node,
  index,
  isOpen,
  onToggle,
  onDelete,
}: {
  node: IFirebirdApiNode
  index: number
  isOpen: boolean
  onToggle: () => void
  onDelete: (e: React.MouseEvent<HTMLDivElement>) => void
}) => (
  <div
    key={node.id}
    className={classNames(
      "relative flex grow cursor-pointer select-none flex-col gap-2 rounded-md border border-slate-100 p-2",
      {
        "bg-kwil/25": isOpen,
        "bg-slate-50/30": !isOpen,
      },
    )}
    onClick={onToggle}
  >
    <div
      className="absolute right-2 top-2 cursor-pointer rounded-full border border-slate-100 p-1 hover:bg-slate-100"
      onClick={onDelete}
    >
      <DeleteIcon className="h-4 w-4" />
    </div>
    <h2 className="flex flex-row items-center gap-2 text-sm font-medium">
      <span>Node #{index + 1}</span>
      <Status status={node.status} />
    </h2>
    <div className="text-sm">{node.name}</div>
    {isOpen && <NodeServices nodeId={node.id} />}
  </div>
)

export const Status = ({ status }: { status: NodeStatus }) => (
  <>
    <div
      className={`h-2 w-2 rounded-full border border-slate-100 ${statusColor[status]}`}
    />
    <span className="text-xs text-slate-500">{capitalize(status)}</span>
  </>
)
