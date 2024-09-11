import { AccessCodeIcon } from "@/utils/icons"

export default function AccessCodeHeader({ authEmail }: { authEmail: string }) {
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-4">
        <AccessCodeIcon className="h-5 w-5 text-gray-900 lg:h-6 lg:w-6" />
        <h2 className="text-lg tracking-tight text-gray-900 lg:text-xl">
          Check your email for a code
        </h2>
      </div>
      <div className="text-sm text-slate-500">
        We sent a code to <strong>{authEmail}</strong>. The code expires
        shortly, so please enter it soon.
      </div>
    </>
  )
}
