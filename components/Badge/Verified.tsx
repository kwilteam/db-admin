import { VerifiedIcon } from "@/utils/icons"

export default function VerifiedBadge() {
  return (
    <div className="flex cursor-pointer select-none flex-row items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
      <VerifiedIcon className="h-4 w-4" /> Verified Publisher
    </div>
  )
}
