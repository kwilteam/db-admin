"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectAccount, setAccount } from "@/store/firebird"
import { verifyAccessCodeAction } from "@/utils/server-actions/firebird"
import { AccessCodeIcon, CheckIcon, ErrorIcon } from "@/utils/icons"
import Image from "next/image"

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
          router.push("/firebird/deployments")
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
          We sent a code to <strong>{account.email}</strong>. The code expires
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

                    // Autofocus on the first input if it's empty
                    if (index === 0 && code[index] === "") el.focus()
                  }
                }}
              />
            ))}
          </div>

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
        </form>
      </div>
    </div>
  )
}
