import Alert from "@/components/Alert"

interface IProps {
  data: Object[] | undefined
  action?: boolean
}
interface IDataItem {
  [key: string]: string
}

export default function DataTable({ data, action = false }: IProps) {
  if (data === undefined || data?.length === 0) {
    {
      !action && <Alert text="No data found" type="info" />
    }
    return
  }

  const columns = Object.keys(data[0])

  return (
    <div className="overflow-scroll border border-slate-200">
      <table className="divide-y divide-slate-200 lg:min-w-full">
        <thead className="bg-slate-50">
          <tr className="divide-x divide-slate-200">
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
          {data.map((dataItem: Object, index: number) => (
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
