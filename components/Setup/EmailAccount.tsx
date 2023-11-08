"use client"
import Link from "next/link"
import classNames from "classnames"
import useEmailAccountSetup from "@/hooks/useEmailAccountSetup"
import Button from "../Button"
import Alert from "../Alert"
import Loading from "../Loading"

export default function EmailAccount() {
  const {
    emailAddress,
    confirmEmailAddress,
    name,
    errors,
    success,
    loading,
    setEmailAddress,
    setConfirmEmailAddress,
    setName,
    createEmailAccount,
  } = useEmailAccountSetup()

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
