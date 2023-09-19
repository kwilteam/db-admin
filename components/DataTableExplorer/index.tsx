import DataTable from "./ManualDataTable"
import Title from "./Title"
import Pagination from "./Pagination"

interface IProps {
  database: string
  type: "table" | "action"
  name: string
}

export default function DataTableExplorer({ database, type, name }: IProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <Title database={database} type={type} name={name} />
      {/* <div className="w-full p-2">Filter options</div> */}
      <div className="bg-w flex-1  px-2">
        <DataTable database={database} type={type} name={name}></DataTable>
      </div>
      <Pagination />
    </div>
  )
}
