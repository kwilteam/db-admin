import { adminAccountExists } from "@/utils/admin/db"
import { isSignedIn } from "@/utils/admin/session"
import { isAdminPkSetup } from "@/utils/admin/setup"

export default async function SetupPage() {
  const accountExists = adminAccountExists()
  const privateKeySetup = isAdminPkSetup()
  const signedIn = await isSignedIn()

  console.log({ accountExists, privateKeySetup, signedIn })

  return <main className="flex flex-col">Setup process</main>
}
