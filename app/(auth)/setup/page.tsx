import { redirect } from "next/navigation"
import { adminAccountExists } from "@/utils/admin/db"
import { isSignedIn } from "@/utils/admin/session"
import { isAdminPkSetup } from "@/utils/admin/setup"
import SetupProcess from "@/components/Setup/SetupProcess"

export default async function SetupPage() {
  const accountExists = adminAccountExists()
  const privateKeySetup = isAdminPkSetup()
  const signedIn = await isSignedIn()

  // Setup process has been completed so redirect to dashboard
  if (accountExists && privateKeySetup) {
    redirect("/")
  }

  // If account exists but not signed in, redirect to sign in page
  if (accountExists && !signedIn) {
    redirect("/sign-in")
  }

  return (
    <main className="my-4 flex w-full flex-col items-center gap-4">
      <SetupProcess
        accountExists={accountExists}
        privateKeySetup={privateKeySetup}
        signedIn={signedIn}
      />
    </main>
  )
}
