import DataTable from "./DataTable"
import Title from "./Title"
import Pagination from "./Pagination"
import Filters from "./Filters"
import { getTableData } from "@/util/api"

interface IProps {
  database: string
  type: "table" | "action"
  name: string
}

export default async function DataExplorer({ database, type, name }: IProps) {
  const data = await getTableData(database, name)

  return (
    <div className="flex max-h-screen min-h-screen flex-col bg-white">
      <Title database={database} type={type} name={name} />
      {/* <Filters /> */}
      <div className="flex-1 overflow-scroll bg-slate-50 p-2 lg:min-h-full">
        <DataTable data={data?.map((obj) => obj)}></DataTable>
      </div>
      <div className="flex">
        <Pagination />
      </div>
    </div>
  )
}
