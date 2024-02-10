"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IProvider } from "@/utils/idb/providers"
import { CloseIcon, PlusIcon } from "@/utils/icons"
import { setAlert } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { saveProviderToStores, selectProviders } from "@/store/providers"
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
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  // This is to make sure that we don't have a provider name when we are creating a new provider
  const isNewProvider = name === "create"
  const providerName = isNewProvider ? undefined : name
  const providers = useAppSelector(selectProviders)
  const [provider, setProvider] = useState<IProvider>({
    name: "",
    url: "",
    chainId: "",
  })
  const [connectNow, setConnectNow] = useState(false)
  const [originalProviderName, setOriginalProviderName] = useState<
    string | undefined
  >(undefined)

  // Use the provider name to find the provider object from the list of providers in the LocalStorage
  useEffect(() => {
    if (!providerName) return

    const _provider = providers?.find((p) => p.name === providerName)

    if (!_provider) {
      router.push("/settings/providers")
      return
    }

    setProvider(_provider)
    setOriginalProviderName(_provider.name)
  }, [providerName, providers, router])

  const saveProvider = () => {
    if (!provider || !validateForm()) return

    dispatch(
      saveProviderToStores({
        originalProviderName,
        provider,
        connectNow,
      }),
    )

    dispatch(
      setAlert({
        text: `Provider ${provider.name} has been saved`,
        type: "success",
      }),
    )

    router.push("/settings/providers")
  }

  const validateForm = () => {
    if (!provider) return

    let newInvalidFields: string[] = []

    if (!provider.name) {
      newInvalidFields.push("name")
    }

    if (isNewProvider || originalProviderName !== provider.name) {
      // If we're creating a new provider we need to make sure that the name is unique
      if (providers?.find((p) => p.name === provider.name)) {
        newInvalidFields.push("name")
      }
    }

    if (
      !provider.url ||
      provider.url.length <= 12 ||
      (!provider.url.startsWith("http://") &&
        !provider.url.startsWith("https://"))
    ) {
      newInvalidFields.push("url")
    }
    if (newInvalidFields.length > 0) {
      setInvalidFields(newInvalidFields)
      console.error(
        "Errors in the following fields: ",
        newInvalidFields.join(", "),
      )
      return false
    }

    // Validation passed - so clear invalid fields & save account
    setInvalidFields([])

    return true
  }

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
