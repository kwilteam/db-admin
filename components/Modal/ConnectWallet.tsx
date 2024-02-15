import Image from "next/image"
import {
  ModalEnum,
  saveActiveAccount,
  selectModal,
  setModal,
} from "@/store/global"
import { getAddress } from "@/utils/wallet"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Button from "../Button"
import Base from "./Base"

export default function ConnectWalletModal({
  activeAccount,
  settingsLoaded,
}: {
  activeAccount: string | undefined
  settingsLoaded: boolean
}) {
  const dispatch = useAppDispatch()
  const modal = useAppSelector(selectModal)

  const continueReadOnly = () => {
    dispatch(setModal(undefined))
  }

  const connectWallet = async () => {
    try {
      const address = await getAddress()
      dispatch(saveActiveAccount(address))
      continueReadOnly()
    } catch (e) {
      console.log(e)
    }
  }

  const modalBody = (
    <div className="flex flex-1 flex-col bg-white p-3">
      <div className="flex flex-col justify-center">
        <div className="text-sm">Connect your wallet to make changes</div>
      </div>
    </div>
  )

  const modalFooter = (
    <div className="flex justify-center gap-2">
      <Button context="secondary" size="md" onClick={continueReadOnly}>
        Read Only
      </Button>
      <Button context="primary" size="md" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </div>
  )

  return (
    <Base
      show={settingsLoaded && modal === ModalEnum.CONNECT && !activeAccount}
      closeModal={continueReadOnly}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}
