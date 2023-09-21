import Table from "./Table"
import Title from "./Title"
import Pagination from "./Pagination"
import Filters from "./Filters"
import { getTableData } from "@/utils/api"
import ActionForm from "./ActionForm"

interface IProps {
  database: string
  type: "table" | "action"
  name: string
}

export default async function DataExplorer({ database, type, name }: IProps) {
  let data: Object[] | undefined = undefined
  if (type === "table") {
    data = await getTableData(database, name)
  }

  return (
    <div className="flex max-h-screen min-h-screen flex-col bg-white">
      <Title database={database} type={type} name={name} />
      {/* <Filters /> */}
      <div className="flex-1 overflow-scroll bg-slate-50 p-2 lg:min-h-full">
        {data && <Table data={data}></Table>}
        {type === "action" && (
          <ActionForm database={database} actionName={name} />
        )}
      </div>
      <div className="flex">
        <Pagination />
      </div>
    </div>
  )
}
