import { useState, useEffect } from "react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import Button from "@/components/Button"
import Base from "@/components/Modal/Base"
import {
  selectDisplayProviderConnectionModal,
  selectSelectedDeployment,
  setDisplayProviderConnectionModal,
} from "@/store/firebird"
import { selectProviderStatus } from "@/store/global"
import {
  KwilProviderStatus,
  selectActiveProviderUrl,
} from "@/store/providers"
import Loading from "../Loading"
import { DatabaseIcon, IdeIcon } from "@/utils/icons"

export default function ProviderConnectionModal() {
  const dispatch = useAppDispatch()
  const displayProviderConnectionModal = useAppSelector(
    selectDisplayProviderConnectionModal,
  )
  const selectedDeployment = useAppSelector(selectSelectedDeployment)
  const providerUrl = selectedDeployment?.service_endpoints.kwil_rpc_provider
  const providerStatus = useAppSelector(selectProviderStatus)
  const activeProviderUrl = useAppSelector(selectActiveProviderUrl)
  const [isLoading, setIsLoading] = useState(true)

  const isSelectedProviderOnline =
    providerStatus === KwilProviderStatus.Online &&
    providerUrl === activeProviderUrl

  useEffect(() => {
    if (
      providerStatus === KwilProviderStatus.Online &&
      providerUrl === activeProviderUrl
    ) {
      setIsLoading(false)
    } else if (
      providerStatus === KwilProviderStatus.Offline &&
      providerUrl === activeProviderUrl
    ) {
      setIsLoading(false)
    }

    return () => {
      setIsLoading(true)
    }
  }, [providerStatus, providerUrl, activeProviderUrl])

  const cancel = () => {
    dispatch(setDisplayProviderConnectionModal(false))

    setTimeout(() => {
      setIsLoading(true)
    }, 500)
  }

  const modalBody = (
    <div className="flex flex-1 flex-col bg-white p-3">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col gap-2 text-sm">
          {isSelectedProviderOnline ? (
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
                          () =>
                            dispatch(setDisplayProviderConnectionModal(false)),
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
                          () =>
                            dispatch(setDisplayProviderConnectionModal(false)),
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
          ) : isLoading ? (
            <div className="flex items-center justify-center gap-1 italic text-gray-500">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col gap-1 italic text-red-500">
              <div>Could not connect to provider.</div>
              <div>Please make sure the provider is online and try again.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const modalFooter = null

  return (
    <Base
      show={displayProviderConnectionModal ?? false}
      closeModal={cancel}
      footer={modalFooter}
    >
      {modalBody}
    </Base>
  )
}
