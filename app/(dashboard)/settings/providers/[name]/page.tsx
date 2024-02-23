"use client"

import Link from "next/link"
import { CloseIcon, PlusIcon } from "@/utils/icons"
import useSaveProvider from "@/hooks/settings/useSaveProvider"
import Header from "@/components/Settings/Providers/Header"
import Button from "@/components/Button"
import ActionPanel from "@/components/Settings/Providers/ActionPanel"
import Form from "@/components/Settings/Providers/Form"

interface IProviderPageProps {
  params: {
    name: string
  }
}

export default function ProviderPage({ params }: IProviderPageProps) {
  const { name } = params
  const {
    isNewProvider,
    provider,
    setProvider,
    connectNow,
    setConnectNow,
    invalidFields,
    originalProviderName,
    saveProvider,
  } = useSaveProvider(name)

  return (
    <>
      <Header
        providerName={
          isNewProvider ? "New Provider" : `${provider.name} Provider`
        }
      />

      <div className="flex-1 overflow-scroll bg-slate-50">
        <Form
          originalProviderName={originalProviderName}
          provider={provider}
          setProvider={setProvider}
          connectNow={connectNow}
          setConnectNow={setConnectNow}
          invalidFields={invalidFields}
        />
      </div>

      <ActionPanel>
        <Button context="secondary">
          <Link href="/settings/providers" className="flex">
            <CloseIcon className="mr-1 h-4 w-4" />
            Cancel
          </Link>
        </Button>
        <Button
          context="primary"
          onClick={() => saveProvider()}
          test-id="submit-account-btn"
        >
          <PlusIcon className="mr-1 h-4 w-4" />
          Save
        </Button>
      </ActionPanel>
    </>
  )
}
