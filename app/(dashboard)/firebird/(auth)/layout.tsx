"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAccount } from "@/utils/firebird/api"
import { SuccessIcon } from "@/utils/icons"
import Image from "next/image"
import Loading from "@/components/Loading"

export default function DeploymentsAuthLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (loggedIn === true) {
      router.push("/firebird/deployments")
    }
  }, [loggedIn, router])

  useEffect(() => {
    const loadAsync = async () => {
      const { status } = await getAccount()

      if (status === 200) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }

    loadAsync()
  }, [])

  if (loggedIn === undefined || loggedIn === true) {
    return <Loading className="mt-4 flex justify-center" />
  }

  if (loggedIn === false) {
    return (
      <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
        <div className="overflow-none flex-1">
          <div className="flex flex-row items-center justify-center">
            <div className="hidden h-screen w-1/2 items-center justify-center bg-gradient-to-r from-white from-10% via-60% to-kwil/20 to-90% text-left lg:flex">
              <div className="flex flex-col">
                <div className="flex flex-row gap-4">
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
                <ul className="mx-0 my-3 flex flex-col gap-2 text-lg tracking-wide text-gray-600">
                  <li>
                    Firebird is Kwil&apos;s deployment as a service platform.
                  </li>
                  <li>It is a platform that allows you to deploy</li>
                  <li>Kwil services with ease.</li>
                </ul>

                <ul className="mx-0 my-3 flex flex-col gap-2 tracking-wide">
                  <li className="flex flex-row items-center gap-2">
                    <SuccessIcon className="h-4 w-4 text-kwil" />
                    <div className="text-sm text-gray-600">
                      Deploy Kwil services in one click
                    </div>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <SuccessIcon className="h-4 w-4 text-kwil" />
                    <div className="text-sm text-gray-600">Fully managed</div>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <SuccessIcon className="h-4 w-4 text-kwil" />
                    <div className="text-sm text-gray-600">
                      Secure and scalable
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex h-screen flex-grow items-start justify-center bg-kwil/20 pt-8 lg:items-center lg:pt-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
