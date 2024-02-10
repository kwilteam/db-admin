import Link from "next/link"
import { IProvider } from "@/utils/idb/providers"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { saveActiveProvider, selectActiveProvider } from "@/store/providers"
import { CheckIcon } from "@/utils/icons"
interface IProvidersTableProps {
  providers: IProvider[]
  confirmDeleteProvider: (name: string) => void
}

export default function ProvidersTable({
  providers,
  confirmDeleteProvider,
}: IProvidersTableProps) {
  const dispatch = useAppDispatch()
  const activeProvider = useAppSelector(selectActiveProvider)

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
              className="w-2/6 p-2 text-left text-sm font-semibold text-slate-900"
            >
              Name
            </th>

            <th
              scope="col"
              className="w-2/6 p-2 text-left text-sm font-semibold text-slate-900"
            >
              URL
            </th>

            <th
              scope="col"
              className="w-1/6 p-2 text-left text-sm font-semibold text-slate-900"
            >
              Chain Id
            </th>

            <th
              scope="col"
              className="w-1/6 p-2 text-left text-sm font-semibold text-slate-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {providers &&
            providers.map((provider: IProvider, index: number) => (
              <tr
                className="divide-x divide-slate-200"
                key={index}
                test-id={`provider-item-${provider.name}`}
              >
                <td className="flex whitespace-nowrap p-2 text-sm text-slate-500">
                  {provider.name}
                  {activeProvider === provider.name && (
                    <CheckIcon className="ml-2 h-5 w-5 text-kwil" />
                  )}
                </td>

                <td className="whitespace-nowrap p-2 text-sm text-slate-500">
                  {provider.url}
                </td>

                <td className="whitespace-nowrap p-2 text-sm text-slate-500">
                  {provider.chainId}
                </td>

                <td className="whitespace-nowrap p-2 text-sm text-slate-500">
                  <Link
                    href={`/settings/providers/${provider.name}`}
                    className="mx-2 text-kwil visited:text-kwil hover:text-kwil-dark"
                  >
                    Edit
                  </Link>
                  |
                  <span
                    test-id={`delete-account-${provider.name}`}
                    onClick={() => confirmDeleteProvider(provider.name)}
                    className="mx-2 cursor-pointer text-kwil visited:text-kwil hover:text-kwil-dark"
                  >
                    Delete
                  </span>
                  {activeProvider !== provider.name && (
                    <>
                      |
                      <span
                        onClick={() =>
                          dispatch(saveActiveProvider(provider.name))
                        }
                        className="mx-2 cursor-pointer text-kwil visited:text-kwil hover:text-kwil-dark"
                      >
                        Set Active
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
