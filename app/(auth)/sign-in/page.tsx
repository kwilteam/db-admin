import { redirect } from "next/navigation"
import ConnectWallet from "@/components/SignIn/ConnectWallet"

export default async function SignIn() {
  return (
    <div className="flex w-full flex-col justify-center gap-3 md:w-2/3">
      <ConnectWallet />
    </div>
  )
}
