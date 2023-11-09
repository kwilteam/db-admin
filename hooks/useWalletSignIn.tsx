import { useState } from "react"
import { useRouter } from "next/navigation"
import { walletRequestMessage, walletSignIn } from "@/utils/api"
import { getAddress, signMessage } from "@/utils/wallet"

export default function useWalletSignIn() {
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()
  const router = useRouter()

  const triggerWalletSignIn = async () => {
    try {
      setError(undefined)
      const address = await getAddress()

      // Generate message
      const messageResponse = await walletRequestMessage(address)

      if (messageResponse.outcome === "error") {
        setError(messageResponse.data)
        setTimeout(() => {
          setError(undefined)
        }, 3000)
        return
      }

      const message = messageResponse.data as string

      // Sign message
      const signature = await signMessage(message)

      // Send signature to API
      const result = await walletSignIn(address, signature)

      if (result.outcome === "error") {
        setError(result.data)

        setTimeout(() => {
          setError(undefined)
        }, 3000)
        return
      }

      // Successfully logged In
      setSuccess("Successfully logged in! Redirecting...")
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (err) {
      setError("Please sign the message to continue.")

      setTimeout(() => {
        setError(undefined)
      }, 3000)
    }
  }

  return { error, success, triggerWalletSignIn }
}
