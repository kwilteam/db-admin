import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  saveActiveProvider,
  saveProviderToStores,
  selectProviders,
} from "@/store/providers"

export const useConnectToProvider = ({
  providerEndpoint,
  instanceName,
  chainId,
}: {
  providerEndpoint: string
  instanceName: string
  chainId: string
}) => {
  const dispatch = useAppDispatch()
  const existingKwilProviders = useAppSelector(selectProviders)

  const connectToProvider = useCallback(() => {
    if (!providerEndpoint || !instanceName || !chainId) return

    console.log("Connect to Provider", existingKwilProviders)
    console.log("Kwil RPC", providerEndpoint)

    const providerAlreadyExists = existingKwilProviders?.find(
      (provider) => provider.url === providerEndpoint,
    )

    if (providerAlreadyExists) {
      // Just connect to this provider
      console.log("Provider exists", providerAlreadyExists)
      dispatch(saveActiveProvider(providerAlreadyExists.name))
    } else {
      // Otherwise save the provider to the DB and connect
      dispatch(
        saveProviderToStores({
          provider: {
            name: instanceName,
            url: providerEndpoint,
            chainId,
          },
          connectNow: true,
        }),
      )
    }
  }, [dispatch, existingKwilProviders, providerEndpoint, instanceName, chainId])

  return { connectToProvider }
}
