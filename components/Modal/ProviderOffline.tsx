import {
  ModalEnum,
  selectModal,
  selectProviderOfflineAcknowledged,
  setModal,
  setProviderOfflineAcknowledged,
} from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Button from "../Button"
import Base from "./Base"
import { useRouter } from "next/navigation"
import { selectActiveProvider } from "@/store/providers"

export default function ProfileOfflineModal() {
  const dispatch = useAppDispatch()
  const activeProvider = useAppSelector(selectActiveProvider)
  const router = useRouter();
  const modal = useAppSelector(selectModal)
  const providerOfflineAcknowledged = useAppSelector(
    selectProviderOfflineAcknowledged,
  )

  const close = () => {
    dispatch(setModal(undefined))
    dispatch(setProviderOfflineAcknowledged(true))
  }

  const openFirebird = () => {
    router.push("/firebird")
  }

  const modalBody = (
    <div className="flex flex-1 flex-col bg-white p-3">
      <div className="flex flex-col justify-center">
        <div className="text-sm text-red-500">
          Could not connect to the selected provider: {activeProvider} <br />
          Please ensure {activeProvider} is online or deploy a new node.
        </div>
      </div>
    </div>
  )

  const modalFooter = (
    <div className="flex justify-center gap-2">
      <Button context="secondary" size="md" onClick={openFirebird}>
        Deploy Node
      </Button>
      <Button context="secondary" size="md" onClick={close}>
        Close
      </Button>
    </div>
  )

  return (
    <Base
      show={
        modal === ModalEnum.PROVIDER_OFFLINE && !providerOfflineAcknowledged
      }
      closeModal={close}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}
