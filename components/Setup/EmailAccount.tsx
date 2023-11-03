"use client"
import { useState } from "react"
import Button from "../Button"
import Link from "next/link"
import { validateEmailAddress } from "@/utils/validate"
import classNames from "classnames"
import { createInitialAccount } from "@/utils/api"
import { EnumAccountType } from "@/utils/admin/schema"
import Alert from "../Alert"
import Loading from "../Loading"

export default function EmailAccount() {
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

  return (
    <form
      className="flex w-full flex-col justify-center gap-2"
      onSubmit={(e) => createEmailAccount(e)}
    >
      {success && <Alert text="Account created!" type="success" />}
      <input
        placeholder="Name"
        test-id="name-input"
        className={classNames({
          "flex-1 rounded-md border bg-white p-2 text-sm": true,
          "border-red-500": errors.includes("name"),
        })}
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input
        placeholder="Email Address"
        test-id="email-address-input"
        className={classNames({
          "flex-1 rounded-md border bg-white p-2 text-sm": true,
          "border-red-500": errors.includes("emailAddress"),
        })}
        type="text"
        onChange={(e) => setEmailAddress(e.target.value)}
        value={emailAddress}
      />

      <input
        placeholder="Confirm Email Address"
        test-id="email-address-input"
        className={classNames({
          "flex-1 rounded-md border bg-white p-2 text-sm": true,
          "border-red-500": errors.includes("confirmEmailAddress"),
        })}
        type="text"
        onChange={(e) => setConfirmEmailAddress(e.target.value)}
        value={confirmEmailAddress}
      />

      <div
        className={classNames({
          "flex flex-row-reverse": true,
          "justify-center": loading,
          "justify-between": !loading,
        })}
      >
        {!loading && (
          <Button context="primary" size="md" type="submit">
            Create Account
          </Button>
        )}

        {loading && <Loading className="flex w-full justify-center" />}

        {!loading && (
          <Link href="/setup?continue=true">
            <Button context="secondary" size="md">
              Cancel
            </Button>
          </Link>
        )}
      </div>
    </form>
  )
}
