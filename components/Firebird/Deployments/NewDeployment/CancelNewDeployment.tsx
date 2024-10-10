import { useRouter } from "next/navigation"
import { CloseIcon } from "@/utils/icons"
import { useAppDispatch } from "@/store/hooks"
import { resetNewDeployment } from "@/store/firebird"

export function CancelNewDeployment() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const cancel = () => {
    // ask to confirm
    const confirmed = confirm("Are you sure you want to cancel the deployment?")
    if (!confirmed) return

    dispatch(resetNewDeployment())

    // redirect to the deployments page
    router.push("/firebird/deployments")
  }

  return (
    <div
      className="m-1 mt-2 flex cursor-pointer flex-row items-center justify-start gap-2 hover:underline lg:ml-3 lg:mt-3"
      onClick={cancel}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-400">
        <CloseIcon className="h-4 w-4" />
      </div>
    </div>
  )
}
