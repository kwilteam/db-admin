import { useRouter } from "next/navigation"
import {
  removeDeployment,
  selectDeleteDeploymentId,
  setDeleteDeploymentId,
} from "@/store/firebird"
import { ModalEnum, selectModal, setModal } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { deleteDeployment } from "@/utils/firebird/api"
import Button from "@/components/Button"
import Base from "@/components/Modal/Base"

export default function DeleteDeploymentModal() {
  const dispatch = useAppDispatch()
  const modal = useAppSelector(selectModal)
  const deleteDeploymentId = useAppSelector(selectDeleteDeploymentId)
  const router = useRouter()

  const cancel = () => {
    dispatch(setModal(undefined))
    dispatch(setDeleteDeploymentId(undefined))
  }

  const continueDeleteDeployment = async () => {
    if (!deleteDeploymentId) return

    const { status, data } = await deleteDeployment(deleteDeploymentId)

    console.log("Delete deployment", status, data)

    if (status === 200) {
      dispatch(removeDeployment(deleteDeploymentId))

      // After deleting, hide modal
      dispatch(setModal(undefined))
      dispatch(setDeleteDeploymentId(undefined))

      router.push("/firebird/deployments")
    }
  }

  const modalBody = (
    <div className="flex flex-1 flex-col bg-white p-3">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col gap-2 text-sm">
          <p>Are you sure you want to delete this deployment?</p>
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
      <Button context="primary" size="md" onClick={continueDeleteDeployment}>
        Delete
      </Button>
    </div>
  )

  return (
    <Base
      show={modal === ModalEnum.DELETE_DEPLOYMENT}
      closeModal={cancel}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}
