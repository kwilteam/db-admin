"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { requestAccessCode } from "@/utils/api"
import Button from "../Button"
import Alert from "../Alert"

export default function EmailForm() {
  const [emailAddress, setEmailAddress] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await requestAccessCode(emailAddress)
      if (result.outcome === "error") {
        setError(result.data ?? "An error occurred")

        setTimeout(() => {
          setError(null)
        }, 3000)
        return
      }

      setSuccess("Check your email for the access code.  Redirecting...")

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
    <form onSubmit={(e) => submitForm(e)}>
      {error && <Alert text={error ?? "Error"} type="error" />}
      {success && <Alert text={success ?? "Success"} type="success" />}
      <div className="flex justify-center">
        <input
          test-id="email-address-input"
          className="m-1 flex-1 rounded-md border bg-white p-2"
          type="text"
          onChange={(e) => setEmailAddress(e.target.value)}
          value={emailAddress}
        />
      </div>

      <div className="flex justify-center">
        <Button context="primary" size="md">
          Continue with Email
        </Button>
      </div>
    </form>
  )
}
