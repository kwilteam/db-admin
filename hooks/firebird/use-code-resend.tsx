import { IFirebirdAuth } from "@/store/firebird"
import { requestOtpAction } from "@/utils/firebird"
import { useState } from "react"

export default function useCodeResend(authEmail: string | undefined) {
  const [codeResent, setCodeResent] = useState<boolean | undefined>(undefined)

  const resendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!authEmail) return
    setCodeResent(undefined)

    const { status, message } = await requestOtpAction(authEmail)

    if (status === 200) {
      setCodeResent(true)
    } else {
      setCodeResent(false)
      console.log(message)
    }

    setTimeout(() => {
      setCodeResent(undefined)
    }, 3500)
  }

  return { codeResent, resendCode }
}
