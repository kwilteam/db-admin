import { useState, useEffect, useCallback, useRef } from "react"
import {
  DeploymentStatus,
  DeploymentEventType,
  EventStreamEvents,
} from "@/utils/firebird/types"

export interface DeploymentStreamMessage {
  status: DeploymentStatus
  payload: {
    event: EventStreamEvents
    type: DeploymentEventType
  }
}

const sseUrl = process.env.NEXT_PUBLIC_FIREBIRD_SSE_URL

const useEventStream = (
  deploymentId: string,
  deploymentStatus: DeploymentStatus | undefined,
) => {
  const eventType =
    deploymentStatus === DeploymentStatus.STARTING
      ? EventStreamEvents.START_INSTANCE
      : deploymentStatus === DeploymentStatus.STOPPING
        ? EventStreamEvents.STOP_INSTANCE
        : undefined

  const method =
    deploymentStatus === DeploymentStatus.STARTING
      ? "follow_deployment_start"
      : deploymentStatus === DeploymentStatus.STOPPING
        ? "follow_deployment_stop"
        : "follow_deployment"

  const eventMap = new Map(
    eventType ? [[eventType, DeploymentEventType.START]] : [],
  )

  const [status, setStatus] = useState<DeploymentStatus | undefined>(undefined)
  const [progress, setProgress] =
    useState<Map<EventStreamEvents, DeploymentEventType>>(eventMap)

  const sseRef = useRef<EventSource | null>(null)

  const updateEventStreamProgress = useCallback(
    (data: DeploymentStreamMessage) => {
      const { event, type } = data.payload
      if (event === eventType) {
        setProgress(new Map([[eventType, type]]))
      }
    },
    [eventType],
  )

  const updateEventStreamStatus = useCallback(
    (data: DeploymentStreamMessage) => {
      const finalStatuses = [
        DeploymentStatus.ACTIVE,
        DeploymentStatus.FAILED,
        DeploymentStatus.TERMINATED,
        DeploymentStatus.STOPPED,
      ]

      setStatus(data.status)

      if (finalStatuses.includes(data.status)) {
        sseRef.current?.close()
      }
    },
    [],
  )

  const handleMessage = useCallback(
    (event: Event) => {
      if (event instanceof MessageEvent) {
        const data: DeploymentStreamMessage = JSON.parse(event.data)
        updateEventStreamProgress(data)
        updateEventStreamStatus(data)
      }
    },
    [updateEventStreamProgress, updateEventStreamStatus],
  )

  useEffect(() => {
    if (!sseUrl) {
      console.error("NEXT_PUBLIC_FIREBIRD_SSE_URL is not set")
      return
    }

    // Ensure existing stream is closed before opening a new one
    if (sseRef.current) {
      sseRef.current.close()
      sseRef.current = null
    }

    // Initialize the new event source stream
    sseRef.current = new EventSource(
      `${sseUrl}?method=${method}&target=${deploymentId}`,
      {
        withCredentials: true,
      },
    )

    const addListener = (event: string, handler: EventListener) => {
      sseRef.current?.addEventListener(event, handler)
    }

    addListener("open", () => {
      console.log("SSE: The connection has been established.")
    })

    addListener("message", handleMessage)

    addListener("ping", (event) => {
      console.log("SSE: Client received a ping event", event)
    })

    addListener("error", (event) => {
      console.error("Client received an error event", event)
    })

    addListener("close", (event) => {
      console.log("SSE: Client received a close event", event)
    })

    sseRef.current.onerror = (err) => {
      console.error("EventSource failed:", err)
    }

    // Cleanup function to close the event source when the component unmounts
    return () => {
      if (sseRef.current) {
        sseRef.current.close()
        sseRef.current = null
      }
    }
  }, [deploymentId, method, eventType, handleMessage])

  return { status, progress }
}

export default useEventStream
