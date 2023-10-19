import { IAccountWithType } from "@/utils/admin-db/schema"
import Link from "next/link"

interface IAccountsTableProps {
  accounts: IAccountWithType[]
}

export default function AccountsTable({ accounts }: IAccountsTableProps) {
  return (
    <div
      test-id="accounts-table"
      className="m-1 overflow-scroll border border-slate-200 lg:m-2"
    >
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr className=" divide-x divide-slate-200">
            <th
              scope="col"
              className="p-2 text-left text-sm font-semibold text-slate-900"
            >
              Name
            </th>

            <th
              scope="col"
              className="p-2 text-left text-sm font-semibold text-slate-900"
            >
              Type
            </th>

            <th
              scope="col"
              className="p-2 text-left text-sm font-semibold text-slate-900"
            >
              Address
            </th>

            <th
              scope="col"
              className="p-2 text-left text-sm font-semibold text-slate-900"
            >
              Created At
            </th>

            <th
              scope="col"
              className="p-2 text-left text-sm font-semibold text-slate-900"
            >
              Updated At
            </th>

            <th
              scope="col"
              className="p-2 text-left text-sm font-semibold text-slate-900"
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {accounts &&
            accounts.map((account: IAccountWithType, index: number) => (
              <tr className="divide-x divide-slate-200" key={index}>
                <td className="whitespace-nowrap p-2 text-sm text-slate-500">
                  {account.name}
                </td>

                <td className="whitespace-nowrap p-2 text-sm text-slate-500">
                  {account.type_name}
                </td>

                <td className="whitespace-nowrap p-2 text-sm text-slate-500">
                  {account.address}
                </td>

                <td className="whitespace-nowrap p-2 text-sm text-slate-500">
                  {account.created_at}
                </td>

                <td className="whitespace-nowrap p-2 text-sm text-slate-500">
                  {account.updated_at}
                </td>

                <td className="whitespace-nowrap p-2 text-sm text-slate-500">
                  <Link
                    href={`/settings/accounts/${account.id}`}
                    className="text-kwil visited:text-kwil hover:text-kwil-dark"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
