import { useAppDispatch } from "@/store/hooks"
import {
  setCheckProviderStatus,
  setProviderOfflineAcknowledged,
} from "@/store/global"
import { useEffect } from "react"

export default function useTriggerProviderStatusCheck() {
  const dispatch = useAppDispatch()

  const triggerProviderStatusCheck = ({
    suppressOfflineWarning = false,
    delay = 0,
  }: {
    suppressOfflineWarning?: boolean
    delay?: number
  }) => {
    if (suppressOfflineWarning) {
      dispatch(setProviderOfflineAcknowledged(true))
    }

    const timeout = setTimeout(() => {
      dispatch(setCheckProviderStatus(true))
    }, delay)

    return () => clearTimeout(timeout)
  }

  return triggerProviderStatusCheck
}

export function useTriggerProviderStatus({
  suppressOfflineWarning = false,
  delay = 0,
}: {
  suppressOfflineWarning?: boolean
  delay?: number
}) {
  const triggerProviderStatusCheck = useTriggerProviderStatusCheck()

  useEffect(() => {
    triggerProviderStatusCheck({ suppressOfflineWarning, delay })
  }, [])
};