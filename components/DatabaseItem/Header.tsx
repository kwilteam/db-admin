import { ModalEnum, setModal } from "@/store/global"
import { useAppDispatch } from "@/store/hooks"
import { ItemType } from "@/utils/database-types"
import {
  ChevronRightIcon,
  DatabaseIcon,
  TableIcon,
  ActionIcon,
  QueryIcon,
  EditIcon,
} from "@/utils/icons"

interface IProps {
  database: string
  type: ItemType
  name: string
}

export default function Header({ database, type, name }: IProps) {
  const dispatch = useAppDispatch()
  return (
    <div className="max-w-screen lg:text-md flex h-10 select-none flex-row items-center gap-2 border-b border-slate-200 bg-slate-50 p-2 text-sm">
      <DatabaseIcon className="h-4 w-4" />
      <span>{database}</span>
      <ChevronRightIcon className="h-4 w-4" />
      {type === "table" && <TableIcon className="h-4 w-4" />}
      {type === "action" && <ActionIcon className="h-4 w-4" />}
      {type === "query" && <QueryIcon className="h-4 w-4" />}

      {name === "new" && <span>New query</span>}

      {name !== "new" && (
        <div
          className="flex max-h-10 cursor-pointer flex-row items-center gap-1 overflow-clip"
          onClick={() => dispatch(setModal(ModalEnum.SAVE_QUERY))}
        >
          {name} <EditIcon className="h-3 w-3" />
        </div>
      )}
    </div>
  )
}
