import { useState } from "react"
import { ModalEnum, selectModal, setModal } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Button from "@/components/Button"
import Base from "@/components/Modal/Base"
import { setTalkWithTeam } from "@/store/firebird"
import Loading from "../Loading"

const calenderUrl = process.env.NEXT_PUBLIC_CALENDER_URL

export default function TalkWithTeamModal() {
  const dispatch = useAppDispatch()
  const modal = useAppSelector(selectModal)
  const [isLoading, setIsLoading] = useState(true)

  const closeModal = () => {
    dispatch(setModal(undefined))
    dispatch(setTalkWithTeam(false))

    setTimeout(() => {
      setIsLoading(true)
    }, 1000)
  }

  const modalBody = (
    <div className="flex h-[calc(100vh-150px)] min-h-[300px] w-full flex-col gap-1 p-2 lg:h-[calc(100vh-200px)] lg:w-[450px]">
      <h3 className="p-1 text-xl font-bold tracking-tighter">Talk with us</h3>
      <p className="p-1 text-sm text-slate-600">
        Let&apos;s talk about your deployment.
      </p>
      {isLoading && (
        <div className="flex flex-grow items-center justify-center">
          <Loading />
        </div>
      )}
      <iframe
        src={calenderUrl}
        width="100%"
        className={`mt-2 flex-grow rounded-md border border-slate-200 ${isLoading ? "hidden" : ""}`}
        title="Talk with team"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )

  const modalFooter = (
    <div className="flex justify-center gap-2">
      <Button context="secondary" size="md" onClick={closeModal}>
        Close
      </Button>
    </div>
  )

  return (
    <Base
      show={modal === ModalEnum.TALK_WITH_TEAM}
      closeModal={closeModal}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}
