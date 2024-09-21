import { useState, useEffect } from "react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Button from "@/components/Button"
import Base from "@/components/Modal/Base"
import { selectProviderConnected, setProviderConnected } from "@/store/firebird"
import { selectProviderStatus } from "@/store/global"
import { KwilProviderStatus } from "@/store/providers"
import Loading from "../Loading"
import { DatabaseIcon, IdeIcon } from "@/utils/icons"

export default function ProviderConnectionModal() {
  const dispatch = useAppDispatch()
  const providerConnected = useAppSelector(selectProviderConnected)
  const providerStatus = useAppSelector(selectProviderStatus)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (providerStatus === KwilProviderStatus.Offline) {
      timer = setTimeout(() => {
        setShowOfflineMessage(true)
      }, 3000)
    } else {
      setShowOfflineMessage(false)
    }
    return () => clearTimeout(timer)
  }, [providerStatus])

  const cancel = () => {
    dispatch(setProviderConnected(undefined))
  }

  const modalBody = (
    <div className="flex flex-1 flex-col bg-white p-3">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col gap-2 text-sm">
          {providerStatus === KwilProviderStatus.Online ? (
            <>
              <div className="flex flex-col gap-1 italic text-kwil">
                <div>Connected to provider.</div>
                <div>How would you like to get started?</div>
                <div className="mt-4 flex justify-center gap-2">
                  <Link href="/ide">
                    <Button
                      context="primary"
                      size="md"
                      onClick={() =>
                        setTimeout(
                          () => dispatch(setProviderConnected(undefined)),
                          500,
                        )
                      }
                    >
                      <IdeIcon className="mr-2 h-4 w-4" />
                      Deploy a Schema
                    </Button>
                  </Link>

                  <Link href="/databases">
                    <Button
                      context="secondary"
                      size="md"
                      onClick={() =>
                        setTimeout(
                          () => dispatch(setProviderConnected(undefined)),
                          500,
                        )
                      }
                    >
                      <DatabaseIcon className="mr-2 h-4 w-4" />
                      Explore Databases
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          ) : showOfflineMessage ? (
            <div className="flex flex-col gap-1 italic text-red-500">
              <div>Could not connect to provider.</div>
              <div>Please make sure the provider is online and try again.</div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1 italic text-gray-500">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const modalFooter = null

  return (
    <Base
      show={providerConnected !== undefined}
      closeModal={cancel}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}
