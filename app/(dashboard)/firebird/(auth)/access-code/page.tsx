"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectAccount, setAccount } from "@/store/firebird"
import { verifyAccessCodeAction } from "@/utils/server-actions/firebird"

export default function AccessCodePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const account = useAppSelector(selectAccount)
  const [code, setCode] = useState(new Array(6).fill(""))
  const [checkingAccessCode, setCheckingAccessCode] = useState(false)
  const [codeSuccess, setCodeSuccess] = useState<boolean | undefined>(undefined)
  const inputRefs = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    if (!account.email) {
      router.push("/firebird/login")
    }
  }, [account.email, router])

  const submitCode = useCallback(
    async (accessCode: string) => {
      setCodeSuccess(undefined)
      setCheckingAccessCode(true)

      const formData = new FormData()
      formData.append("accessCode", accessCode)

      const token = await verifyAccessCodeAction(formData)
      dispatch(setAccount({ token, email: account.email }))

      if (token) {
        setCodeSuccess(true)

        setTimeout(() => {
          router.push("/firebird/home")
        }, 500)
      } else {
        setCodeSuccess(false)

        setTimeout(() => {
          setCodeSuccess(undefined)
        }, 3000)
      }

      setCheckingAccessCode(false)
    },
    [account.email, dispatch, router],
  )

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
  }, [submitCode])

  const handleChange = (value: string, index: number) => {
    const newCode = [...code]

    newCode[index] = value
    setCode(newCode)

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus()
    }

    if (newCode.every((digit) => digit !== "")) {
      submitCode(newCode.join(""))
    }
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-sm flex-col gap-2 lg:w-96">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl tracking-tight text-slate-700">
            Check your email for a code
          </h2>
          <p className="text-sm text-slate-500">
            We sent a code to <strong>{account.email}</strong>. The code expires
            shortly, so please enter it soon.
          </p>
        </div>

        <div className="mt-4">
          <form className="space-y-4">
            <div>
              <div className="mt-2 flex justify-center space-x-2">
                {code.map((_, index) => (
                  <input
                    key={index}
                    type="string"
                    maxLength={1}
                    autoComplete="off"
                    className="h-14 w-full rounded border border-none py-1.5 text-center shadow-sm ring-1 ring-slate-300 focus:border-kwil focus:outline-none focus:ring-2 focus:ring-kwil"
                    onChange={(e) => handleChange(e.target.value, index)}
                    ref={(el) => {
                      if (el !== null) {
                        inputRefs.current[index] = el

                        // Autofocus on the first input if it's empty
                        if (index === 0 && code[index] === "") el.focus()
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            {checkingAccessCode && (
              <p className="text-sm text-kwil/80">Checking access code...</p>
            )}

            {codeSuccess === false && (
              <p className="text-sm text-red-500">
                This access code is invalid. Please try again.
              </p>
            )}

            {codeSuccess === true && (
              <p className="text-sm text-kwil">
                Great! You&apos;re in. Redirecting...
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
