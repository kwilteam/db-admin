import { useState } from "react"
import { requestOtpAction } from "@/utils/firebird/api"
import { useAppDispatch } from "@/store/hooks"
import { setAlert } from "@/store/global"

export default function useCodeResend(authEmail: string | undefined) {
  const dispatch = useAppDispatch()
  const [codeResent, setCodeResent] = useState<boolean | undefined>(undefined)
  const [resendingCode, setResendingCode] = useState<boolean>(false)

  const resendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!authEmail) return
    setCodeResent(undefined)
    setResendingCode(true)

    const { status, message } = await requestOtpAction(authEmail)
    setResendingCode(false)

    if (status === 200) {
      setCodeResent(true)

      setTimeout(() => {
        setCodeResent(undefined)
      }, 3500)
    } else {
      dispatch(
        setAlert({
          text: "There was a problem sending your access code.  Please try again in 30 seconds.",
          type: "error",
        }),
      )
      setCodeResent(undefined)

      console.log(message)
    }
  }

  return { codeResent, resendCode, resendingCode }
}
