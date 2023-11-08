"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { redirect, useSearchParams } from "next/navigation"
import { validateAccessCode } from "@/utils/api"
import Alert from "@/components/Alert"
import Button from "@/components/Button"
import Loading from "@/components/Loading"

export default function AccessCodePage() {
  const searchParams = useSearchParams()
  const emailAddress = searchParams.get("email")

  if (!emailAddress) {
    redirect("/sign-in")
  }

  const [code, setCode] = useState(Array(6).fill(""))
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const pastedArray = pastedData.slice(0, 6).split("")

    if (pastedArray.every((char) => /^\d+$/.test(char))) {
      setCode([...pastedArray, ...Array(6 - pastedArray.length).fill("")])
    }
  }

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        e.target.value.length > 1 ||
        (!/^\d+$/.test(e.target.value) && e.target.value !== "")
      ) {
        return
      }
      const newCode = [...code]
      newCode[index] = e.target.value
      setCode(newCode)
      if (e.target.value !== "" && index < 5) {
        inputsRef.current[index + 1]?.focus()
      }
    }

  const submitAccessCode = useCallback(async () => {
    const accessCode = code.join("")

    if (accessCode.length !== 6) {
      setError("Please enter an access code")
      setTimeout(() => {
        setError(null)
      }, 3000)
      return
    }

    setLoading(true)
    try {
      const result = await validateAccessCode(emailAddress, accessCode)
      if (result.outcome === "error") {
        setError(result.data ?? "An error occurred")

        setLoading(false)
        setTimeout(() => {
          setError(null)
        }, 3000)
        return
      }

      setSuccess("Access code validated!  Redirecting...")

      // redirect(`/databases`) - Next.js error so using window.location.href
      window.location.href = "/databases"
    } catch (error) {
      alert("Something went wrong. Please try again.")
      setLoading(false)
      return
    }
  }, [code, emailAddress])

  useEffect(() => {
    if (code.join("").length === 6) {
      submitAccessCode()
    }
  }, [code, submitAccessCode])

  return (
    <div>
      <form
        className="flex flex-col gap-2"
        onPaste={handlePaste}
        onSubmit={(e) => {
          e.preventDefault()
          submitAccessCode()
        }}
      >
        {error && <Alert text={error ?? "Error"} type="error" />}
        {success && <Alert text={success ?? "Success"} type="success" />}
        <div className="flex flex-row space-x-2">
          {code.map((num, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={num}
              onChange={handleChange(i)}
              className="h-12 w-12 rounded border text-center text-lg"
              ref={(el) => (inputsRef.current[i] = el)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          {loading ? (
            <Loading className="flex items-center" />
          ) : (
            <Button context="primary" size="md" disabled={loading}>
              Continue
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
