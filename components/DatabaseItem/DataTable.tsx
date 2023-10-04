import Alert from "@/components/Alert"
import Loading from "@/components/Loading"

interface IProps {
  columns: string[] | undefined
  data: Object[] | undefined
  type: "table" | "action"
  isLoading?: boolean
}
interface IDataItem {
  [key: string]: string
}

export default function DataTable({ columns, data, type, isLoading }: IProps) {
  if (isLoading) {
    return (
      <Loading className="flex h-screen justify-center bg-slate-50 pt-10" />
    )
  }

  if (type === "table" && !isLoading && !data?.length) {
    return <Alert text="No data found" type="info" className="m-2" />
  }

  if (!columns) {
    return
  }

  return (
    <div className="m-2 overflow-scroll border border-slate-200">
      <table className="divide-y divide-slate-200 lg:min-w-full">
        <thead className="bg-slate-50">
          <tr className=" divide-x divide-slate-200">
            {columns.map((column: string) => (
              <th
                key={column}
                scope="col"
                className="p-2 text-left text-sm font-semibold text-slate-900"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {data &&
            data.map((dataItem: Object, index: number) => (
              <tr className="divide-x divide-slate-200" key={index}>
                {columns.map((column) => (
                  <td
                    key={column}
                    className="whitespace-nowrap p-2 text-sm text-slate-500"
                  >
                    {(dataItem as IDataItem)[column] as string}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
