"use client"

import { people } from "./testData"

interface IProps {
  database: string
  type: "table" | "action"
  name: string
}

export default function ManualDataTable({ database, type, name }: IProps) {
  const columns = Object.keys(people[0])

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
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {people.map((person) => (
            <tr className="divide-x divide-slate-200" key={person.email}>
              {columns.map((column) => (
                <td
                  key={column}
                  className="whitespace-nowrap p-2 text-sm text-slate-500"
                >
                  {person[column as any]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
