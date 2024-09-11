import { useRouter } from "next/navigation"
import { CloseIcon } from "@/utils/icons"

export function CancelNewDeployment() {
  const router = useRouter()

  const cancel = () => {
    // ask to confirm
    const confirmed = confirm("Are you sure you want to cancel the deployment?")
    if (!confirmed) return

    // redirect to the deployments page
    router.push("/firebird/deployments")
  }

  return (
    <div
      className="m-3 ml-3 flex w-20 cursor-pointer flex-row items-center gap-2 hover:underline"
      onClick={cancel}
    >
      <div className="rounded-full border border-slate-200 p-1 text-slate-500">
        <CloseIcon className="h-3 w-3" />
      </div>
      <button className="btn btn-outline btn-error text-sm text-slate-500">
        Cancel
      </button>
    </div>
  )
}
