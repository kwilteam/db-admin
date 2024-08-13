"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectAuth } from "@/store/firebird"
import { AccessCodeIcon, CheckIcon, ErrorIcon } from "@/utils/icons"
import useAccessCode from "@/hooks/firebird/use-access-code"
import useCodeResend from "@/hooks/firebird/use-code-resend"

export default function AccessCodePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuth)

  const {
    code,
    setCode,
    checkingAccessCode,
    codeSuccess,
    inputRefs,
    submitCode,
    handleChange,
  } = useAccessCode(auth, dispatch, router)

  const { codeResent, resendCode } = useCodeResend(auth)

  useEffect(() => {
    if (!auth.email) {
      router.push("/firebird/login")
    }
  }, [auth.email, router])

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const paste = e?.clipboardData?.getData("text")
      if (paste?.length === 6 && /^\d+$/.test(paste)) {
        const digits = paste.split("")
        setCode(digits)
        inputRefs.current.forEach((input, index) => {
          if (input) input.value = digits[index]
        })
        submitCode(digits.join(""))
      }
    }

    window.addEventListener("paste", handlePaste)
    return () => window.removeEventListener("paste", handlePaste)
  }, [submitCode, setCode, inputRefs])

  return (
    <div className="flex w-full flex-col justify-center gap-6 p-3">
      <div className="flex flex-row items-center justify-center gap-2 lg:hidden">
        <Image
          className=""
          src="/images/kwil.png"
          alt="Kwil"
          width={60}
          height={60}
        />
        <div className="pt-2 text-2xl font-bold tracking-tight text-kwil">
          Kwil Firebird
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-sm flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:w-96 lg:p-8">
        <div className="flex flex-row items-center justify-center gap-4">
          <AccessCodeIcon className="h-5 w-5 text-gray-900 lg:h-6 lg:w-6" />
          <h2 className="text-lg tracking-tight text-gray-900 lg:text-xl">
            Check your email for a code
          </h2>
        </div>

        <div className="text-sm text-slate-500">
          We sent a code to <strong>{auth.email}</strong>. The code expires
          shortly, so please enter it soon.
        </div>

        <form className="space-y-4">
          <div className="mt-2 flex justify-center space-x-2">
            {code.map((_, index) => (
              <input
                key={index}
                type="string"
                maxLength={1}
                autoComplete="off"
                className="h-12 w-full rounded border border-none py-1.5 text-center text-sm shadow-sm ring-1 ring-slate-300 focus:border-kwil focus:outline-none focus:ring-2 focus:ring-kwil lg:h-14"
                onChange={(e) => handleChange(e.target.value, index)}
                ref={(el) => {
                  if (el !== null) {
                    inputRefs.current[index] = el
                    if (index === 0 && code[index] === "") el.focus()
                  }
                }}
              />
            ))}
          </div>

          {!checkingAccessCode &&
            codeSuccess === undefined &&
            codeResent === undefined && (
              <div className="mt-4 flex gap-2 text-sm text-gray-500">
                <button
                  onClick={resendCode}
                  className="font-semibold text-kwil/80"
                >
                  Resend code
                </button>
              </div>
            )}

          {checkingAccessCode && (
            <p className="text-sm text-kwil/80">Checking access code...</p>
          )}

          {codeSuccess === false && (
            <p className="flex flex-row items-center gap-2 text-sm text-red-500">
              <ErrorIcon className="h-6 w-6" /> The code wasn&apos;t valid. Try
              again!
            </p>
          )}

          {codeSuccess === true && (
            <p className="flex flex-row items-center gap-2 text-sm text-kwil-dark">
              <CheckIcon className="h-4 w-4" /> Great! You&apos;re in.
              Redirecting...
            </p>
          )}

          {codeResent === false && (
            <p className="flex flex-row items-center gap-2 text-sm text-red-500">
              <ErrorIcon className="h-6 w-6" /> There was a problem sending the
              code. Please try again!
            </p>
          )}

          {codeResent === true && (
            <p className="flex flex-row items-center gap-2 text-sm text-kwil-dark">
              <CheckIcon className="h-4 w-4" /> Code sent! Please check your
              email.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
