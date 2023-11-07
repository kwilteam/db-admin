import { SettingsIcon } from "@/utils/icons"
import Link from "next/link"

export default function Header() {
  return (
    <div className="max-w-screen lg:text-md flex select-none flex-row items-center gap-2 border-b border-slate-200 bg-slate-50 p-2 text-sm">
      <Link
        href="/settings/general"
        className="flex items-center gap-2 hover:underline"
      >
        <SettingsIcon className="h-4 w-4" />
        <span>General</span>
      </Link>
    </div>
  )
}
