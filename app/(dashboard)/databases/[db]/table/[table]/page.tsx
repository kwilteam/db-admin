import { ChevronRightIcon, DatabaseIcon, TableIcon } from "@/util/icons"

interface IProps {
  params: {
    db: string
    table: string
  }
}

// TODO: Verify that the table exists on the database before rendering form
export default async function DatabaseTablePage({ params }: IProps) {
  const { db, table } = params

  return (
    <div className="flex flex-col">
      <div className="flex select-none flex-row items-center gap-2 bg-slate-100 p-2">
        <DatabaseIcon className="h-4 w-4" />
        <span>{db}</span>
        <ChevronRightIcon className="h-5 w-5" />
        <TableIcon className="h-4 w-4" />
        <span>{table}</span>
      </div>
    </div>
  )
}
