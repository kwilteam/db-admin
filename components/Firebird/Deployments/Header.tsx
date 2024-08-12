import Link from "next/link"
import { FirebirdIcon } from "@/utils/icons"

export default function Header({ providerName }: { providerName?: string }) {
  return (
    <div className="max-w-screen lg:text-md flex h-10 select-none flex-row items-center gap-2 border-b border-slate-200 bg-slate-50 p-2 text-sm">
      <Link
        href="/firebird/deployments"
        className="flex items-center gap-2 hover:underline"
      >
        <FirebirdIcon className="h-4 w-4" />
        <span>{providerName ?? "Deployments"}</span>
      </Link>
    </div>
  )
}
