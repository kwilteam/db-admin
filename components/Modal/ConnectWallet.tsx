import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  ModalEnum,
  selectModal,
  setActiveAccount,
  setModal,
} from "@/store/global"
import { getAddress } from "@/utils/wallet"
import Button from "../Button"
import Base from "./Base"

export default function ConnectWalletModal({
  activeAccount,
}: {
  activeAccount: string | undefined
}) {
  const dispatch = useAppDispatch()
  const modal = useAppSelector(selectModal)

  const continueReadOnly = () => {
    dispatch(setModal(undefined))
  }

  const connectWallet = async () => {
    try {
      const address = await getAddress()
      dispatch(setActiveAccount(address))
      continueReadOnly()
    } catch (e) {
      console.log(e)
    }
  }

  const modalBody = (
    <div className="flex flex-1 flex-col bg-white p-3">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col gap-2 text-sm">
          <p>You are currently in read only mode.</p>
          <p>
            You will need to connect your wallet to <br />
            deploy schemas and execute mutating actions.
          </p>
        </div>
      </div>
    </div>
  )

  const modalFooter = (
    <div className="flex justify-center gap-2">
      <Button context="secondary" size="md" onClick={continueReadOnly}>
        Continue
      </Button>
      <Button context="primary" size="md" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </div>
  )

  return (
    <Base
      show={modal === ModalEnum.CONNECT && !activeAccount}
      closeModal={continueReadOnly}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}
