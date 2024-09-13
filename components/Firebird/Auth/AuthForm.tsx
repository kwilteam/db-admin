"use client"

import { FormEvent, ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import classNames from "classnames"
import { useAppDispatch } from "@/store/hooks"
import { setAuthEmail } from "@/store/firebird"
import { requestOtpAction } from "@/utils/firebird/api"
import ContinueWithGoogle from "@/components/ContinueWithGoogle"
import { CheckIcon, ErrorIcon } from "@/utils/icons"
import Loading from "@/components/Loading"

interface AuthFormProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

export default function AuthForm({ title, icon, children }: AuthFormProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [emailSent, setEmailSent] = useState<boolean | undefined>(undefined)
  const [requestingOtp, setRequestingOtp] = useState<boolean>(false)

  const onEmailChange = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (emailRegex.test(email)) {
      dispatch(setAuthEmail(email))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")

    if (typeof email !== "string" || !email) return

    setEmailSent(undefined)
    setRequestingOtp(true)
    try {
      const response = await requestOtpAction(email)

      if (response && response.status === 200) {
        setEmailSent(true)

        setTimeout(() => {
          router.push("/firebird/access-code")
          setRequestingOtp(false)
        }, 1000)
      } else {
        setEmailSent(false)
        setRequestingOtp(false)
        console.log(response?.message || "Unknown error occurred")
      }
    } catch (error) {
      setEmailSent(false)
      console.error("Error requesting OTP:", error)
    }

    setTimeout(() => {
      setEmailSent(undefined)
    }, 3500)
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
      <div className="mx-auto flex w-full max-w-sm flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:w-96 lg:max-w-sm lg:p-8">
        <div className="flex flex-row items-center justify-center gap-4">
          {icon}
          <h2 className="text-lg tracking-tight text-gray-900 lg:text-xl">
            {title}
          </h2>
        </div>

        <ContinueWithGoogle />

        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="px-4 text-gray-600">or</span>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  data-testid="email-input"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
                  onChange={(e) => onEmailChange(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="h-10 w-full justify-center rounded-md bg-kwil/80 py-1 text-sm text-white hover:bg-kwil/90"
                data-testid="continue-button"
                disabled={requestingOtp}
              >
                {requestingOtp ? (
                  <Loading
                    className="flex items-center justify-center"
                    color="white"
                  />
                ) : (
                  <div className="flex items-center justify-center">
                    Continue
                  </div>
                )}
              </button>
            </div>

            <div
              className={classNames("mt-4 flex gap-2 text-sm text-gray-500", {
                hidden: emailSent !== undefined,
              })}
            >
              {children}
            </div>

            {emailSent === false && (
              <p
                className="flex flex-row items-center gap-2 text-sm text-red-500"
                data-testid="error-message"
              >
                <ErrorIcon className="h-6 w-6" /> There was a problem sending
                the email.
              </p>
            )}

            {emailSent === true && (
              <p
                className="flex flex-row items-center gap-2 text-sm text-kwil-dark"
                data-testid="success-message"
              >
                <CheckIcon className="h-4 w-4" /> Code sent!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}