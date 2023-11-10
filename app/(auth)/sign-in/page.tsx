import { redirect } from "next/navigation"
import { adminAccountExists } from "@/utils/admin/db"
import { isSignedIn } from "@/utils/admin/session"
import ConnectWallet from "@/components/SignIn/ConnectWallet"
import EmailForm from "@/components/SignIn/EmailForm"

export default async function SignIn() {
  const accountExists = adminAccountExists()
  const signedIn = await isSignedIn()

  if (!accountExists) {
    redirect("/setup")
  }

  // If signed in, redirect to dashboard
  if (signedIn) {
    redirect("/")
  }

  return (
    <div className="flex w-full flex-col justify-center gap-3 md:w-2/3">
      <div className="flex justify-center text-xl text-slate-700">
        Sign in to your account
      </div>
      <ConnectWallet />
      <div className="flex items-center justify-center text-sm text-slate-500">
        <hr className="flex-grow" />
        <span className="px-2">or</span>
        <hr className="flex-grow" />
      </div>
      <EmailForm />
    </div>
  )
}
