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

export default function DeleteNodeModal() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const modal = useAppSelector(selectModal)
  const modalData: { nodeId: string; onlyNode: boolean } | undefined =
    useAppSelector(selectModalData)

  const cancel = () => {
    dispatch(setModal(undefined))
    setTimeout(() => {
      dispatch(setModalData(undefined))
    }, 500)
  }

  const continueDeleteNode = async () => {
    if (!modalData || !modalData.nodeId) return

    const { status, data } = await deleteNode(modalData.nodeId)

    console.log("Delete node", status, data)

    if (status === 200) {
      // TODO: Nodes currently not in a store, so we can't remove them
      // dispatch(removeDeployment(nodeId))

      // After deleting, hide modal
      dispatch(setModal(undefined))

      setTimeout(() => {
        dispatch(setModalData(undefined))
      }, 500)

      router.refresh()
    } else {
      dispatch(
        setAlert({
          text: "There was a problem deleting the node.",
          type: "error",
        }),
      )
    }
  }

  const modalBody = (
    <div className="flex flex-1 flex-col bg-white p-3">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col gap-2 text-sm">
          <p>Are you sure you want to delete this node?</p>
          {modalData?.onlyNode && (
            <div className="flex flex-col gap-1 italic text-red-500">
              <div>This is the only node in the deployment.</div>
              <div>Terminating this node will terminate the deployment.</div>
            </div>
          )}
          <p>This action is irreversible.</p>
        </div>
      </div>
    </div>
  )

  const modalFooter = (
    <div className="flex justify-center gap-2">
      <Button context="secondary" size="md" onClick={cancel}>
        Cancel
      </Button>
      <Button context="primary" size="md" onClick={continueDeleteNode}>
        Delete
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
