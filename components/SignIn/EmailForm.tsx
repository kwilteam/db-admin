"use client"

import useEmailSignIn from "@/hooks/useEmailSignIn"
import Button from "../Button"
import Alert from "../Alert"
import Loading from "../Loading"

export default function EmailForm() {
  const {
    emailSignIn,
    emailAddress,
    setEmailAddress,
    loading,
    error,
    success,
  } = useEmailSignIn()

  return (
    <form onSubmit={(e) => emailSignIn(e)} className="flex flex-col gap-2">
      {error && <Alert text={error ?? "Error"} type="error" />}
      {success && <Alert text={success ?? "Success"} type="success" />}
      <div className="flex justify-center">
        <input
          test-id="email-address-input"
          className="flex-1 rounded-md border bg-white p-2"
          type="text"
          onChange={(e) => setEmailAddress(e.target.value)}
          value={emailAddress}
        />
      </div>

      <div className="flex justify-center">
        {loading ? (
          <Loading className="flex items-center" />
        ) : (
          <Button context="primary" size="md">
            Continue with Email
          </Button>
        )}
      </div>
    </form>
  )
}
