import Link from "next/link"
import { IAccountWithType } from "@/utils/admin/schema"
import { selectCurrentUser } from "@/store/global"
import { useAppSelector } from "@/store/hooks"
interface IAccountsTableProps {
  accounts: IAccountWithType[]
  confirmDeleteAccount: (id: number) => void
}

export default function AccountsTable({
  accounts,
  confirmDeleteAccount,
}: IAccountsTableProps) {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <div
      test-id="accounts-table"
      className="m-1 overflow-scroll border border-slate-200 lg:m-2"
    >
      <table
        className="min-w-full divide-y divide-slate-200"
        test-id="accounts-table"
      >
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
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {accounts &&
            accounts.map((account: IAccountWithType, index: number) => (
              <tr
                className="divide-x divide-slate-200"
                key={index}
                test-id={`account-item-${account.name}`}
              >
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
                    className="mx-2 text-kwil visited:text-kwil hover:text-kwil-dark"
                  >
                    Edit
                  </Link>
                  {currentUser?.id !== account.id && (
                    <>
                      |
                      <span
                        test-id={`delete-account-${account.address}`}
                        onClick={() => confirmDeleteAccount(account.id)}
                        className="mx-2 cursor-pointer text-kwil visited:text-kwil hover:text-kwil-dark"
                      >
                        Delete
                      </span>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
