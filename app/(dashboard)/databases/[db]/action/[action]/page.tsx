import { DatabaseIcon, ActionIcon, ChevronRightIcon } from "@/util/icons"
interface IProps {
  params: {
    db: string
    action: string
  }
}

// TODO: Verify that the table exists on the database before rendering form
export default async function DatabaseActionPage({ params }: IProps) {
  const { db, action } = params

  return (
    <div className="flex flex-col">
      <div className="flex select-none flex-row items-center gap-2 bg-slate-50 p-2">
        <DatabaseIcon className="h-4 w-4" />
        <span>{db}</span>
        <ChevronRightIcon className="h-5 w-5" />
        <ActionIcon className="h-4 w-4" />
        <span>{action}</span>
      </div>
    </div>
  )
}
