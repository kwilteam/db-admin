import DataTable from "./ManualDataTable"
import Title from "./Title"
import Pagination from "./Pagination"
import Filters from "./Filters"

interface IProps {
  database: string
  type: "table" | "action"
  name: string
}

export default function DataTableExplorer({ database, type, name }: IProps) {
  return (
    <div className="flex max-h-screen flex-grow flex-col bg-white">
      <Title database={database} type={type} name={name} />
      {/* <Filters /> */}
      <div className="flex-1 overflow-scroll bg-slate-50 p-2">
        <DataTable database={database} type={type} name={name}></DataTable>
      </div>
      <div className="flex">
        <Pagination />
      </div>
    </div>
  )
}
