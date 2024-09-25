import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ModalEnum,
  selectModal,
  selectModalData,
  setAlert,
  setModal,
  setModalData,
} from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { deleteNode } from "@/utils/firebird/api"
import Button from "@/components/Button"
import Base from "@/components/Modal/Base"
import {
  deleteDeploymentNode,
  selectSelectedDeployment,
} from "@/store/firebird"
import Loading from "../Loading"
import useTriggerProviderStatusCheck from "@/hooks/use-trigger-provider-status-check"

export default function DeleteNodeModal() {
  const triggerProviderStatusCheck = useTriggerProviderStatusCheck()
  const dispatch = useAppDispatch()
  const deployment = useAppSelector(selectSelectedDeployment)
  const modal = useAppSelector(selectModal)
  const modalData:
    | {
        deploymentId: string
        nodeId: string
        onlyNode: boolean
        nodeName: string
      }
    | undefined = useAppSelector(selectModalData)
  const [deleting, setDeleting] = useState(false)
  const [instanceName, setInstanceName] = useState("")

  const cancel = () => {
    dispatch(setModal(undefined))
    setInstanceName("")
    setTimeout(() => {
      dispatch(setModalData(undefined))
    }, 500)
  }

  const continueDeleteNode = async () => {
    if (!modalData || !modalData.nodeId || !isDeleteEnabled) return

    setDeleting(true)
    const { status } = await deleteNode(modalData.nodeId)
    setDeleting(false)

    if (status === 200) {
      dispatch(
        deleteDeploymentNode({
          deploymentId: modalData.deploymentId,
          nodeId: modalData.nodeId,
        }),
      )

      dispatch(
        setAlert({
          text: "Node deleted successfully",
          type: "success",
        }),
      )

      dispatch(setModal(undefined))
      setInstanceName("")
      setTimeout(() => {
        dispatch(setModalData(undefined))
      }, 500)

      triggerProviderStatusCheck({ suppressOfflineWarning: true, delay: 2000 })
    } else {
      dispatch(
        setAlert({
          text: "There was a problem deleting the node.",
          type: "error",
        }),
      )
    }
  }

  const isDeleteEnabled =
    instanceName === deployment?.config.machines.instance_name

  const modalBody = (
    <div className="flex flex-1 flex-col bg-white p-3">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-col gap-2 text-sm">
          <p data-testid="delete-node-confirmation">
            Are you sure you want to delete this node?
          </p>
          {modalData?.onlyNode && (
            <div
              data-testid="only-node-warning"
              className="flex flex-col gap-1 italic text-red-500"
            >
              <div>This is the only node in the deployment.</div>
              <div>Terminating this node will terminate the deployment.</div>
            </div>
          )}
          <p>
            Enter the instance name to confirm:
            <br />
            <strong>{deployment?.config.machines.instance_name}</strong>
          </p>
        </div>
        <input
          type="text"
          value={instanceName}
          onChange={(e) => setInstanceName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              continueDeleteNode()
            }
          }}
          placeholder=""
          className="rounded border-2 border-gray-300 p-3 text-center text-sm focus:border-2 focus:border-kwil/100 focus:outline-none focus:ring-0 focus:ring-kwil/100"
        />
      </div>
    </div>
  )

  const modalFooter = (
    <div className="flex justify-center gap-2">
      <Button context="secondary" size="md" onClick={cancel}>
        Cancel
      </Button>
      <Button
        context="danger"
        size="md"
        onClick={continueDeleteNode}
        disabled={!isDeleteEnabled}
      >
        {deleting ? <Loading color="white" /> : "Delete"}
      </Button>
    </div>
  )

  return (
    <Base
      show={modal === ModalEnum.DELETE_NODE}
      closeModal={cancel}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}

// export default function DeleteNodeModal() {
//   const dispatch = useAppDispatch()
//   const router = useRouter()
//   const modal = useAppSelector(selectModal)
//   const modalData:
//     | {
//         deploymentId: string
//         nodeId: string
//         onlyNode: boolean
//       }
//     | undefined = useAppSelector(selectModalData)

//   const cancel = () => {
//     dispatch(setModal(undefined))
//     setTimeout(() => {
//       dispatch(setModalData(undefined))
//     }, 500)
//   }

//   const continueDeleteNode = async () => {
//     if (!modalData || !modalData.nodeId) return

//     const { status, data } = await deleteNode(modalData.nodeId)

//     console.log("Delete node", status, data)

//     if (status === 200) {
//       dispatch(
//         deleteDeploymentNode({
//           deploymentId: modalData.deploymentId,
//           nodeId: modalData.nodeId,
//         }),
//       )

//       // After deleting, hide modal
//       dispatch(setModal(undefined))

//       setTimeout(() => {
//         dispatch(setModalData(undefined))
//       }, 500)

//       router.refresh()
//     } else {
//       dispatch(
//         setAlert({
//           text: "There was a problem deleting the node.",
//           type: "error",
//         }),
//       )
//     }
//   }

//   const modalBody = (
//     <div className="flex flex-1 flex-col bg-white p-3">
//       <div className="flex flex-col justify-center">
//         <div className="flex flex-col gap-2 text-sm">
//           <p>Are you sure you want to delete this node?</p>
//           {modalData?.onlyNode && (
//             <div className="flex flex-col gap-1 italic text-red-500">
//               <div>This is the only node in the deployment.</div>
//               <div>Terminating this node will terminate the deployment.</div>
//             </div>
//           )}
//           <p>This action is irreversible.</p>
//         </div>
//       </div>
//     </div>
//   )

//   const modalFooter = (
//     <div className="flex justify-center gap-2">
//       <Button context="secondary" size="md" onClick={cancel}>
//         Cancel
//       </Button>
//       <Button context="primary" size="md" onClick={continueDeleteNode}>
//         Delete
//       </Button>
//     </div>
//   )

//   return (
//     <Base
//       show={modal === ModalEnum.DELETE_NODE}
//       closeModal={cancel}
//       footer={modalFooter}
//     >
//       {modalBody}
//     </Base>
//   )
// }
