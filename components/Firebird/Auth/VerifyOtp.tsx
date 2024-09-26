"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectAuthEmail } from "@/store/firebird"
import useAccessCode from "@/hooks/firebird/use-access-code"
import useCodeResend from "@/hooks/firebird/use-code-resend"
import AccessCodeHeader from "@/components/Firebird/Auth/AccessCodeHeader"
import AccessCodeForm from "@/components/Firebird/Auth/AccessCodeForm"
import AccessCodeStatus from "@/components/Firebird/Auth/AccessCodeStatus"

export default function VerifyOtp() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const authEmail = useAppSelector(selectAuthEmail)

  const {
    code,
    setCode,
    checkingAccessCode,
    codeSuccess,
    inputRefs,
    submitCode,
    handleChange,
  } = useAccessCode(authEmail, dispatch, router)

  const { codeResent, resendCode, resendingCode } = useCodeResend(authEmail)

  useEffect(() => {
    if (!authEmail) {
      router.push("/firebird/login")
    }
  }, [authEmail, router])

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

  const handleResendCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCode(Array(6).fill(""))
    inputRefs.current.forEach((input) => {
      if (input) input.value = ""
    })
    resendCode(e)
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
      {authEmail && (
        <div className="mx-auto flex w-full max-w-sm flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:w-96 lg:p-8">
          <AccessCodeHeader authEmail={authEmail} />
          <AccessCodeForm
            code={code}
            handleChange={handleChange}
            inputRefs={inputRefs}
          />
          <AccessCodeStatus
            checkingAccessCode={checkingAccessCode}
            resendingCode={resendingCode}
            codeSuccess={codeSuccess}
            codeResent={codeResent}
            handleResendCode={handleResendCode}
          />
        </div>
      )}
    </div>
  )
}
