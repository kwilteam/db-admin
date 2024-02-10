import Link from "next/link"
import { ProviderIcon } from "@/utils/icons"

export default function Header({ providerName }: { providerName?: string }) {
  return (
    <div className="max-w-screen lg:text-md flex select-none flex-row items-center gap-2 border-b border-slate-200 bg-slate-50 p-2 text-sm">
      <Link
        href="/settings/providers"
        className="flex items-center gap-2 hover:underline"
      >
        <ProviderIcon className="h-4 w-4" />
        <span>{providerName ?? "Providers"}</span>
      </Link>
    </div>
  )
}
