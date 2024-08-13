import { useCallback, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { IFirebirdAuth, setAccount } from "@/store/firebird"
import { verifyOtpAction } from "@/utils/server-actions/firebird"
import { AppDispatch } from "@/store"

export default function useAccessCode(
  auth: IFirebirdAuth,
  dispatch: AppDispatch,
  router: ReturnType<typeof useRouter>,
) {
  const [code, setCode] = useState(new Array(6).fill(""))
  const [checkingAccessCode, setCheckingAccessCode] = useState(false)
  const [codeSuccess, setCodeSuccess] = useState<boolean | undefined>(undefined)
  const inputRefs = useRef<HTMLInputElement[]>([])

  const submitCode = useCallback(
    async (accessCode: string) => {
      setCodeSuccess(undefined)
      setCheckingAccessCode(true)
      if (!auth.email || !auth.context) {
        setCheckingAccessCode(false)
        return
      }

      try {
        const result = await verifyOtpAction(
          accessCode,
          auth.email,
          auth.context,
        )

        if (result && result.success && result.token) {
          dispatch(
            setAccount({
              token: result.token,
              email: auth.email,
            }),
          )
          setCodeSuccess(true)
          setTimeout(() => {
            router.push("/firebird/deployments")
          }, 500)
        } else {
          console.log(result?.message || "Verification failed")
          setCodeSuccess(false)
          setTimeout(() => {
            setCodeSuccess(undefined)
          }, 3000)
        }
      } catch (error) {
        console.error("Error verifying OTP:", error)
        setCodeSuccess(false)
        setTimeout(() => {
          setCodeSuccess(undefined)
        }, 3000)
      }

      setCheckingAccessCode(false)
    },
    [auth, dispatch, router],
  )

  const handleChange = (value: string, index: number) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    if (numericValue !== value) {
      // Immediately remove non-numeric values
      inputRefs.current[index].value = numericValue
    }
    const newCode = [...code]
    newCode[index] = numericValue
    setCode(newCode)

    if (numericValue !== "" && index < 5) {
      inputRefs.current[index + 1].focus()
    }

    if (newCode.every((digit) => digit !== "")) {
      submitCode(newCode.join(""))
    }
  }

  return {
    code,
    setCode,
    checkingAccessCode,
    codeSuccess,
    inputRefs,
    submitCode,
    handleChange,
  }
}
