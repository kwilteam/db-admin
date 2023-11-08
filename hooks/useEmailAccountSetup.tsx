import { EnumAccountType } from "@/utils/admin/schema"
import { createInitialAccount } from "@/utils/api"
import { validateEmailAddress } from "@/utils/validate"
import { useState } from "react"

export default function useEmailAccountSetup() {
  const [emailAddress, setEmailAddress] = useState("")
  const [confirmEmailAddress, setConfirmEmailAddress] = useState("")
  const [name, setName] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validForm = () => {
    let errorArray = []

    if (name.length < 3) {
      errorArray.push("name")
    }

    if (!emailAddress.length) {
      errorArray.push("emailAddress")
    } else if (!validateEmailAddress(emailAddress)) {
      errorArray.push("Invalid email address.")
    }

    if (!confirmEmailAddress.length) {
      errorArray.push("confirmEmailAddress")
    } else if (emailAddress !== confirmEmailAddress) {
      errorArray.push("confirmEmailAddress")
    }

    setErrors(errorArray)

    return errorArray.length === 0
  }

  const createEmailAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validForm()) {
      try {
        setLoading(true)
        const result = await createInitialAccount(
          name,
          EnumAccountType.Email,
          emailAddress,
        )

        if (result.outcome === "success") {
          setSuccess(true)

          // refresh the page to go to the mnemonic page
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } else {
          throw new Error(result.data)
        }
      } catch (error) {
        setLoading(false)
        const err = error as Error
        alert(
          err.message ??
            "There was a problem creating your account. Please try again.",
        )
      }
    }
  }

  return {
    emailAddress,
    confirmEmailAddress,
    name,
    errors,
    success,
    loading,
    setEmailAddress,
    setConfirmEmailAddress,
    setName,
    setErrors,
    setSuccess,
    setLoading,
    createEmailAccount,
  }
}
