"use client"

import { FormEvent } from "react"
import { redirect, useRouter } from "next/navigation"
import Link from "next/link"
import { useAppDispatch } from "@/store/hooks"
import { setAccount } from "@/store/firebird"
import { loginAction } from "@/utils/server-actions/firebird"
import ContinueWithGoogle from "@/components/ContinueWithGoogle"

export default function DeploymentsLoginPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const setFirebirdEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (emailRegex.test(email)) {
      dispatch(setAccount({ email }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const success = await loginAction(formData)

    if (success) {
      router.push("/firebird/access-code")
    }
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-sm flex-col gap-2 lg:w-96">
        <div>
          {/* <Image alt="Kwil" src="/images/kwil.png" width={40} height={40} /> */}
          <h2 className="text-2xl tracking-tight text-slate-700">
            Log in to your account
          </h2>
        </div>

        <ContinueWithGoogle />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="px-4 text-gray-900">or</span>
          </div>
        </div>

        <div className="mt-0">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80 sm:text-sm sm:leading-6"
                    onChange={(e) => setFirebirdEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button className="text-md w-full justify-center rounded-md bg-kwil/80 py-2 text-white hover:bg-kwil/90">
                  Continue
                </button>
              </div>

              <div className="flex gap-2 text-sm text-gray-500">
                Don&apos;t have an account?
                <Link
                  href="/firebird/register"
                  className="font-semibold text-kwil/80"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
