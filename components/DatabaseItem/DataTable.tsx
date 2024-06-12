import Alert from "@/components/Alert"
import Loading from "@/components/Loading"
import { IColumn } from "@/utils/data-table"
import { ItemType } from "@/utils/database-types"

interface IProps {
  columns?: IColumn[] | undefined
  data: Object[] | undefined
  totalCount: number | undefined
  type: ItemType
  isLoading?: boolean
}
interface IDataItem {
  [key: string]: ItemType | undefined
}

export default function DataTable({
  columns,
  data,
  totalCount,
  type,
  isLoading,
}: IProps) {
  if (isLoading) {
    return (
      <Loading
        data-testid="loading"
        className="flex justify-center bg-slate-50 pt-10"
      />
    )
  }

  if (
    (type === "table" || type === "query") &&
    !isLoading &&
    totalCount === 0
  ) {
    return <Alert text="No data found" type="info" className="m-2" />
  }

  if (!columns) {
    return
  }

  return (
    <div
      data-testid="data-table"
      className="m-1 border border-slate-200 lg:m-2"
    >
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr className=" divide-x divide-slate-200">
            {columns.map((column: IColumn) => (
              <th
                key={column.name}
                scope="col"
                className="p-2 text-left text-sm font-semibold text-slate-900"
              >
                {column.name}
                {column.type &&
                  <a
                    className="text-[11px] text-slate-500 ml-1"
                    title={column.type}
                  >
                    ({column.type})
                  </a>
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data &&
            data.map((dataItem: Object, index: number) => (
              <tr className="divide-x divide-slate-200" key={index}>
                {columns.map((column: IColumn) => (
                  <td
                    key={column.name}
                    className="whitespace-nowrap p-2 text-sm text-slate-500"
                  >
                    {(dataItem as IDataItem)[column.name] as string}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
