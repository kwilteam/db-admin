import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { IProvider } from "@/utils/idb/providers"
import { setAlert } from "@/store/global"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { saveProviderToStores, selectProviders } from "@/store/providers"

export default function useSaveProvider(name: string) {
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
      return false
    }

    // Validation passed - so clear invalid fields & save account
    setInvalidFields([])

    return true
  }

  return {
    isNewProvider,
    provider,
    setProvider,
    connectNow,
    setConnectNow,
    invalidFields,
    originalProviderName,
    saveProvider,
  }
}
