import { useState } from "react"
import { useRouter } from "next/navigation"
import { removeDeployment, selectActiveDeployment } from "@/store/firebird"
import { ModalEnum, selectModal, setAlert, setModal } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { deleteDeployment } from "@/utils/firebird/api"
import Button from "@/components/Button"
import Base from "@/components/Modal/Base"
import Loading from "../Loading"

export default function DeleteDeploymentModal() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const modal = useAppSelector(selectModal)
  const deployment = useAppSelector(selectActiveDeployment)
  const [deleting, setDeleting] = useState(false)
  const [instanceName, setInstanceName] = useState("")

  const cancel = () => {
    dispatch(setModal(undefined))
  }

  const continueDeleteDeployment = async () => {
    if (!deployment) return

    setDeleting(true)
    const { status } = await deleteDeployment(deployment.id)
    setDeleting(false)

    if (status === 200) {
      dispatch(removeDeployment(deployment.id))

      dispatch(
        setAlert({
          text: "Deployment deleted successfully",
          type: "success",
        }),
      )
      router.push("/firebird/deployments")

      dispatch(setModal(undefined))
    } else {
      dispatch(
        setAlert({
          text: "Deployment deletion failed",
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
          <p>Are you sure you want to delete this deployment?</p>
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
        onClick={continueDeleteDeployment}
        disabled={!isDeleteEnabled}
      >
        {deleting ? <Loading color="white" /> : "Delete"}
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
