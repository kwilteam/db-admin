import { useAppDispatch } from "@/store/hooks"
import { setTalkWithTeamModal } from "@/store/firebird"
import { ScheduleIcon } from "@/utils/icons"

export function TalkWithTeam(): JSX.Element {
  const dispatch = useAppDispatch()
  const openModal = () => dispatch(setTalkWithTeamModal(true))

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
        <ScheduleIcon className="mr-2 h-5 w-5" />
        Talk with team
      </button>
    </div>
  )
}
