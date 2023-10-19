import { AccountsIcon, ChevronRightIcon } from "@/utils/icons"
import Link from "next/link"

interface IHeaderProps {
  accountName?: string
}

export default function Header({ accountName }: IHeaderProps) {
  return (
    <div className="max-w-screen lg:text-md flex select-none flex-row items-center gap-2 border-b border-slate-200 bg-slate-50 p-2 text-sm">
      <Link
        href="/settings/accounts"
        className="flex items-center gap-2 hover:underline"
      >
        <AccountsIcon className="h-4 w-4" />
        <span>Accounts</span>
      </Link>

      {accountName && (
        <>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="max-h-10 overflow-clip">{accountName}</div>
        </>
      )}
    </div>
  )
}
