import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  KwilProviderStatus,
  saveActiveProvider,
  saveProviderToStores,
  selectProviders,
} from "@/store/providers"
import {
  setProviderOfflineAcknowledged,
  setProviderStatus,
} from "@/store/global"
import { setDatabaseActiveContext, setDatabases } from "@/store/database"
import { setDisplayProviderConnectionModal } from "@/store/firebird"

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
  const [isConnecting, setIsConnecting] = useState(false)

  const connectToProvider = useCallback(() => {
    if (!providerEndpoint || !instanceName || !chainId) return

    setIsConnecting(true)

    const providerAlreadyExists = existingKwilProviders?.find(
      (provider) => provider.url === providerEndpoint,
    )

    if (providerAlreadyExists) {
      // Just connect to this provider
      dispatch(setProviderStatus(KwilProviderStatus.Unknown))
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

    // Reset the database state
    dispatch(setDatabases(undefined))
    dispatch(setDatabaseActiveContext(undefined))
  }, [dispatch, existingKwilProviders, providerEndpoint, instanceName, chainId])

  const displayConnectedModal = useCallback(() => {
    dispatch(setDisplayProviderConnectionModal(true))
    dispatch(setProviderOfflineAcknowledged(true))
  }, [dispatch])

  useEffect(() => {
    if (isConnecting) {
      displayConnectedModal()
      setIsConnecting(false)
    }
  }, [isConnecting, displayConnectedModal])

  return { connectToProvider, displayConnectedModal }
}
