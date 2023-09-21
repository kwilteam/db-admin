import { getTableData } from "@/utils/api"
import DataTable from "@/components/DatabaseItem/DataTable"
import Pagination from "@/components/DatabaseItem/Pagination"
import Title from "@/components/DatabaseItem/Header"

interface IProps {
  params: {
    db: string
    table: string
  }
}

// TODO: Verify that the table exists on the database before rendering form
export default async function DatabaseTablePage({ params }: IProps) {
  const { db: database, table: name } = params
  const type = "table"

  const data = await getTableData(database, name)

  return (
    <div className="flex max-h-screen min-h-screen flex-col bg-white">
      <Title database={database} type={type} name={name} />

      <div className="flex-1 overflow-scroll bg-slate-50 p-2 lg:min-h-full">
        {/* <Filters /> */}
        <DataTable data={data} />
        <div className="flex">
          <Pagination />
        </div>
      </div>
    </div>
  )
}
