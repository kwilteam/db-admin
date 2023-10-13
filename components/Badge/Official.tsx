import Image from "next/image"

export default function OfficialBadge() {
  return (
    <div className="flex cursor-pointer select-none flex-row items-center gap-1 rounded-full bg-kwil/20 px-2 py-1 text-xs text-kwil-dark">
      <Image
        className="h-4 w-4"
        width={20}
        height={20}
        src="/images/favicon.png"
        alt="kwil"
      />
      Official
    </div>
  )
}
