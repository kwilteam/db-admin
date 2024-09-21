import { ModalEnum, setModal } from "@/store/global"
import { useAppDispatch } from "@/store/hooks"
import { DeleteIcon } from "@/utils/icons"

export default function DeleteDeploymentButton() {
  const dispatch = useAppDispatch()

  const triggerDeleteDeploymentModal = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    dispatch(setModal(ModalEnum.DELETE_DEPLOYMENT))
  }

  return (
    <button
      className="absolute right-3 top-3 flex cursor-pointer rounded-lg border border-slate-100 p-1 text-slate-600 hover:border-slate-300 hover:text-slate-900"
      onClick={triggerDeleteDeploymentModal}
    >
      <DeleteIcon className="h-4 w-4" />
    </button>
  )
}
