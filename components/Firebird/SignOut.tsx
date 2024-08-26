import { selectAccount, setAccount } from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { signOut } from "@/utils/firebird"
import { FirebirdIcon } from "@/utils/icons"
import { useRouter } from "next/navigation"

export default function FirebirdSignOut() {
  const dispatch = useAppDispatch()
  const firebirdAccount = useAppSelector(selectAccount)
  const router = useRouter()

  const triggerSignOut = async () => {
    const { status, message } = await signOut()
    if (status === 200) {
      dispatch(setAccount(undefined))
      router.push("/firebird/login")
    } else {
      console.error("Sign out failed", message)
    }
  }

  if (!firebirdAccount) {
    return null
  }

  return (
    <div className="flex w-24 flex-row items-center gap-2">
      <button
        className="inline-flex w-24 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white p-1 px-2 text-sm font-thin text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        onClick={triggerSignOut}
      >
        <FirebirdIcon className="h-4 w-4" /> Sign out
      </button>
    </div>
  )
}
