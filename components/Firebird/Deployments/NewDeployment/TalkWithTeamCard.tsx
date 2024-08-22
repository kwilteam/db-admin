import { IFirebirdNewDeployment, setTalkWithTeamModal } from "@/store/firebird"
import { useAppDispatch } from "@/store/hooks"
import classNames from "classnames"

interface ITalkWithTeamCardProps {
  title: string
  subtitle: string
}

export function TalkWithTeamCard({ title, subtitle }: ITalkWithTeamCardProps) {
  const dispatch = useAppDispatch()
  const openModal = () => dispatch(setTalkWithTeamModal(true))

  const _classNames =
    "flex w-full lg:w-1/2 select-none flex-row gap-2 rounded-md border border-kwil/80 bg-slate-50"

  return (
    <div className={_classNames}>
      <div className="flex w-full flex-row items-center justify-evenly gap-5 p-3">
        <span className="text-xl tracking-tighter">{title}</span>
        <span className="text-sm">{subtitle}</span>
        <div className="flex flex-grow justify-end gap-2">
          <button
            className="m-1 cursor-pointer rounded-md bg-kwil px-3 py-2 text-sm text-slate-50"
            onClick={openModal}
          >
            Contact us
          </button>
        </div>
      </div>
    </div>
  )
}
