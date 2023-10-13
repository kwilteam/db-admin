import { PublisherIcon } from "@/utils/icons"

interface IPublisherBadgeProps {
  publisher: string
}

export default function PublisherBadge({ publisher }: IPublisherBadgeProps) {
  return (
    <div className="flex cursor-pointer select-none flex-row items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
      <PublisherIcon className="h-4 w-4" />
      {publisher}
    </div>
  )
}
