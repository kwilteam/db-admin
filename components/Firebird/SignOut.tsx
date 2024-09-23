import { selectAccount, setAccount } from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { signOut } from "@/utils/firebird/api"
import { UserIcon } from "@/utils/icons"
import { useRouter } from "next/navigation"

export default function FirebirdSignOut() {
  const dispatch = useAppDispatch()
  const firebirdAccount = useAppSelector(selectAccount)
  const router = useRouter()

  const triggerSignOut = async () => {
    const { status, message } = await signOut()
    if (status === 200) {
      router.push("/firebird/login")
      setTimeout(() => {
        dispatch(setAccount(undefined))
      }, 500)
    } else {
      console.error("Sign out failed", message)
    }
  }

  if (!firebirdAccount) {
    return null
  }

  // First 4 and last 4 of email
  const email = firebirdAccount.email
  const emailDisplay = `${email.slice(0, 10)}...${email.slice(-10)}`

  return (
    <div className="flex items-center gap-2">
      <button
        className="inline-flex w-auto items-center justify-center gap-2 rounded-md border border-slate-200 bg-white p-1 px-2 text-sm font-thin text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        onClick={triggerSignOut}
      >
        <span className="hidden flex-row items-center gap-2 md:flex">
          <UserIcon className="h-4 w-4" /> {emailDisplay} | Sign out
        </span>
        <span className="flex flex-row items-center gap-2 md:hidden">
          <UserIcon className="h-4 w-4" /> Sign out
        </span>
      </button>
    </div>
  )
}
