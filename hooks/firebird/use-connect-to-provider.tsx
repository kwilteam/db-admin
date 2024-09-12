import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  KwilProviderStatus,
  saveActiveProvider,
  saveProviderToStores,
  selectProviders,
} from "@/store/providers"
import {
  ModalEnum,
  selectProviderStatus,
  setModal,
  setModalData,
  setProviderOfflineAcknowledged,
} from "@/store/global"
import { setDatabaseActiveContext, setDatabases } from "@/store/database"
import { setProviderConnected } from "@/store/firebird"

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
  const providerStatus = useAppSelector(selectProviderStatus)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectToProvider = useCallback(() => {
    if (!providerEndpoint || !instanceName || !chainId) return

    setIsConnecting(true)

    console.log("Connect to Provider", existingKwilProviders)
    console.log("Kwil RPC", providerEndpoint)

    const providerAlreadyExists = existingKwilProviders?.find(
      (provider) => provider.url === providerEndpoint,
    )

    if (providerAlreadyExists) {
      // Just connect to this provider
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

  useEffect(() => {
    dispatch(setProviderOfflineAcknowledged(true))

    if (isConnecting) {
      dispatch(setProviderConnected(true))
      setIsConnecting(false)
    }
  }, [isConnecting, providerStatus, dispatch])

  return { connectToProvider }
}
