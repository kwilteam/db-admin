import { selectTalkWithTeamModal, setTalkWithTeamModal } from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

const calenderUrl = process.env.NEXT_PUBLIC_CALENDER_URL

export default function TalkWithTeamModal() {
  const dispatch = useAppDispatch()
  const isTalkWithTeamModalOpen = useAppSelector(selectTalkWithTeamModal)

  const closeModal = () => dispatch(setTalkWithTeamModal(false))

  return (
    <>
      {isTalkWithTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative h-full w-full bg-white lg:h-[90%] lg:w-auto lg:rounded-md">
            <button
              className="absolute right-2 top-2 rounded-md p-2 text-sm text-slate-600 hover:text-slate-800"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="flex h-full w-full flex-col gap-1 p-2 lg:w-[450px]">
              <h3 className="p-1 text-xl font-bold tracking-tighter">
                Talk with us
              </h3>
              <p className="p-1 text-sm text-slate-600">
                Let&apos;s talk about your deployment.
              </p>
              <iframe
                src={calenderUrl}
                width="100%"
                height="100%"
                className="mt-2 rounded-md border border-slate-200"
                title="Talk with team"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
