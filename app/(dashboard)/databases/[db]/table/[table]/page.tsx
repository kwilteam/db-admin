import { DatabaseIcon } from "@/util/icons"

interface IProps {
  params: {
    db: string
    table: string
  }
}

// TODO: Verify that the table exists on the database before rendering form
export default async function DatabaseTablePage({ params }: IProps) {
  const { db, table } = params
  console.log(db, table)
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2 bg-slate-100 p-2">
        <DatabaseIcon className="h-4 w-4" />
        {db}
      </div>
      <div>{table}</div>
    </div>
  )
}
