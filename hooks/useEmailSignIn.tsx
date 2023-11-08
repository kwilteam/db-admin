import { useState } from "react"
import { useRouter } from "next/navigation"
import { requestAccessCode } from "@/utils/api"

export default function useEmailSignIn() {
  const router = useRouter()
  const [emailAddress, setEmailAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const emailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      const result = await requestAccessCode(emailAddress)
      if (result.outcome === "error") {
        setError(result.data ?? "An error occurred")
        setLoading(false)

        setTimeout(() => {
          setError(null)
        }, 3000)
        return
      }

      setSuccess("Check your email for the access code.  Redirecting...")
      setLoading(true)

      setTimeout(() => {
        router.push(`/access-code?email=${emailAddress}`)
      }, 1000)
    } catch (error) {
      alert("Something went wrong. Please try again.")
      console.error("error", error)
      return
    }
  }

  return {
    emailSignIn,
    emailAddress,
    setEmailAddress,
    loading,
    error,
    success,
  }
}
