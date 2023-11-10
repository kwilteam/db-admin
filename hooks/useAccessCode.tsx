import { emailSignIn } from "@/utils/api"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import React, { useCallback, useEffect, useRef, useState } from "react"

export default function useAccessCode() {
  const router = useRouter()
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
      const result = await emailSignIn(emailAddress, accessCode)
      if (result.outcome === "error") {
        setError(result.data ?? "An error occurred")

        setLoading(false)
        setTimeout(() => {
          setError(null)
        }, 3000)
        return
      }

      setSuccess("Access code validated!  Redirecting...")

      router.push("/databases")
    } catch (error) {
      alert("Something went wrong. Please try again.")
      setLoading(false)
      return
    }
  }, [code, emailAddress, router])

  useEffect(() => {
    if (code.join("").length === 6) {
      submitAccessCode()
    }
  }, [code, submitAccessCode])

  return {
    code,
    loading,
    error,
    success,
    inputsRef,
    handlePaste,
    handleChange,
    submitAccessCode,
  }
}
