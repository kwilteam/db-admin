import { IAccount, IAccountType } from "@/utils/admin-db/schema"
import { getAccountTypes } from "@/utils/api"
import classNames from "classnames"
import { useEffect, useState } from "react"

interface IFormProps {
  account: IAccount
  setAccount: (account: IAccount) => void
  invalidFields: string[]
}

export default function Form({
  account,
  setAccount,
  invalidFields,
}: IFormProps) {
  const [accountTypes, setAccountTypes] = useState<IAccountType[]>()

  useEffect(() => {
    const initAccountTypes = async () => {
      try {
        const accountTypes = await getAccountTypes()
        setAccountTypes(accountTypes.data)
      } catch (error) {
        console.error(
          "An error occurred while retrieving account types:",
          error,
        )
      }
    }

    initAccountTypes()
  }, [])

  const updateAccount = (key: string, value: string) => {
    const updatedAccount = { ...account, [key]: value }
    setAccount(updatedAccount)
  }

  return (
    <div
      test-id="accounts-form"
      className="m-1 overflow-scroll border border-slate-200 bg-white p-2 lg:m-2"
    >
      <div className="">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Name
        </label>
        <div className="m-1">
          <div
            className={classNames({
              "flex rounded-md shadow-sm ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-kwil sm:max-w-md":
                true,
              "ring-red-500": invalidFields.includes("name"),
            })}
          >
            <input
              type="text"
              id="name"
              autoComplete="name"
              className={classNames({
                "block flex-1 border-0 bg-transparent p-2 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:leading-6":
                  true,
              })}
              placeholder="Name"
              value={account?.name ?? ""}
              onChange={(e) => updateAccount("name", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <label
          htmlFor="type"
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Account Type
        </label>
        <div className="m-1">
          <div
            className={classNames({
              "flex rounded-md shadow-sm ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-kwil sm:max-w-md":
                true,
              "ring-red-500": invalidFields.includes("type_id"),
            })}
          >
            <select
              id="type"
              autoComplete="type"
              className={classNames({
                "block flex-1 border-0 bg-transparent p-2 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:leading-6":
                  true,
              })}
              placeholder="type"
              value={account?.type_id ?? ""}
              onChange={(e) => updateAccount("type_id", e.target.value)}
            >
              <option value="0">Select an account type</option>
              {accountTypes?.map((accountType: IAccountType) => (
                <option key={accountType.id} value={accountType.id}>
                  {accountType.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="address"
            className="block text-sm font-medium leading-6 text-slate-900"
          >
            Address
          </label>
          <div className="m-1">
            <div
              className={classNames({
                "flex rounded-md shadow-sm ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-kwil sm:max-w-md":
                  true,
                "ring-red-500": invalidFields.includes("address"),
              })}
            >
              <input
                type="text"
                id="address"
                autoComplete="address"
                className={classNames({
                  "block flex-1 border-0 bg-transparent p-2 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:leading-6":
                    true,
                })}
                value={account?.address ?? ""}
                onChange={(e) => updateAccount("address", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
