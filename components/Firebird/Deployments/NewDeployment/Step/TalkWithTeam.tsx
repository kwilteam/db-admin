import { useAppDispatch } from "@/store/hooks"
import { setTalkWithTeamModal } from "@/store/firebird"

export function TalkWithTeam(): JSX.Element {
  const dispatch = useAppDispatch()
  const openModal = () => dispatch(setTalkWithTeamModal(true))

  return (
    <div className="flex select-none flex-row items-center rounded-b-md border-t border-slate-200 bg-slate-50 p-1 text-slate-700">
      <div className="flex flex-grow flex-col pl-2">
        <span className="text-xs text-slate-600">
          Schedule a call with our team to discuss your deployment.
        </span>
      </div>
      <button
        className="m-1 rounded-md bg-sky-600 px-3 py-2 text-sm text-slate-50"
        onClick={openModal}
      >
        Talk with team
      </button>
    </div>
  )
}
