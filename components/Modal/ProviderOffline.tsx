import { ModalEnum, selectModal, setModal } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Button from "../Button"
import Base from "./Base"

export default function ProfileOfflineModal({
  settingsLoaded,
}: {
  settingsLoaded: boolean
}) {
  const dispatch = useAppDispatch()
  const modal = useAppSelector(selectModal)

  const close = () => {
    dispatch(setModal(undefined))
  }

  const modalBody = (
    <div className="flex flex-1 flex-col bg-white p-3">
      <div className="flex flex-col justify-center">
        <div className="text-sm text-red-500">
          It was not possible to connect to the Kwil Provider. <br />
          Please make sure that the Kwil Provider is online.
        </div>
      </div>
    </div>
  )

  const modalFooter = (
    <div className="flex justify-center gap-2">
      <Button context="secondary" size="md" onClick={close}>
        Close
      </Button>
    </div>
  )

  return (
    <Base
      show={settingsLoaded && modal === ModalEnum.PROVIDER_OFFLINE}
      closeModal={close}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}
