import { setTalkWithTeam } from "@/store/firebird"
import { ModalEnum, setModal } from "@/store/global"
import { useAppDispatch } from "@/store/hooks"
import { ScheduleIcon } from "@/utils/icons"

export function TalkWithTeam(): JSX.Element {
  const dispatch = useAppDispatch()

  const openModal = () => {
    dispatch(setModal(ModalEnum.TALK_WITH_TEAM))
    dispatch(setTalkWithTeam(true))
  }

  return (
    <div className="flex flex-grow select-none flex-row items-center justify-end gap-2 p-1 text-slate-700">
      <div className="flex flex-grow flex-col pl-2">
        <span className="text-md text-slate-600">
          Schedule a call with our team to discuss your deployment.
        </span>
      </div>
      <button
        className="text-md m-1 flex flex-row items-center rounded-md bg-kwil px-4 py-3 text-slate-50"
        onClick={openModal}
      >
        <ScheduleIcon className="h-5 w-5 lg:mr-2" />
        <span className="hidden lg:block">Talk with team</span>
      </button>
    </div>
  )
}
