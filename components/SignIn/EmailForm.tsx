"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { requestAccessCode } from "@/utils/api"
import Button from "../Button"
import Alert from "../Alert"
import Loading from "../Loading"

export default function EmailForm() {
  const [emailAddress, setEmailAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
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
        // redirect(`/access-code`) - Next.js error so using window.location.href
        window.location.href = `/access-code?email=${emailAddress}`
      }, 1000)
    } catch (error) {
      alert("Something went wrong. Please try again.")
      console.error("error", error)
      return
    }
  }

  return (
    <form onSubmit={(e) => submitForm(e)} className="flex flex-col gap-2">
      {error && <Alert text={error ?? "Error"} type="error" />}
      {success && <Alert text={success ?? "Success"} type="success" />}
      <div className="flex justify-center">
        <input
          test-id="email-address-input"
          className="flex-1 rounded-md border bg-white p-2"
          type="text"
          onChange={(e) => setEmailAddress(e.target.value)}
          value={emailAddress}
        />
      </div>

      <div className="flex justify-center">
        {loading ? (
          <Loading className="flex items-center" />
        ) : (
          <Button context="primary" size="md">
            Continue with Email
          </Button>
        )}
      </div>
    </form>
  )
}
