"use client"

interface IProps {
  database: string
  type: "table" | "action"
  name: string
}

interface IPerson {
  name: string
  title: string
  email: string
  role: string
}

const people: IPerson[] = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com1",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com2",
    role: "Member",
  },
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com3",
    role: "Member",
  },
]

export default function ManualDataTable({ database, type, name }: IProps) {
  const columns = Object.keys(people[0])

  return (
    <div className="overflow-x-auto">
      <div className="inline-block w-full py-2 align-middle">
        <div className="overflow-hidden border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="divide-x divide-slate-200">
                {columns.map((column: string) => (
                  <th
                    key={column}
                    scope="col"
                    className="p-2 text-left text-sm font-semibold text-gray-900"
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
                      className="whitespace-nowrap p-2 text-sm text-gray-500"
                    >
                      {person[column as keyof IPerson]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
