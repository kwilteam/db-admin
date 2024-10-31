import { useState, useEffect, useCallback, useRef } from "react"
import {
  DeploymentStatus,
  DeploymentEventType,
  DeploymentEvents,
} from "@/utils/firebird/types"

interface DeploymentStreamMessage {
  status: DeploymentStatus
  payload: {
    event: DeploymentEvents
    type: DeploymentEventType
  }
}

const sseUrl = process.env.NEXT_PUBLIC_FIREBIRD_SSE_URL

const useEventStream = (
  deploymentId: string,
  deploymentStatus?: string,
) => {
  const deploymentEventMap = new Map([
    [DeploymentEvents.INIT_KEY_PAIR, DeploymentEventType.START],
    [DeploymentEvents.CREATE_INSTANCE, DeploymentEventType.NOT_STARTED],
    [DeploymentEvents.WAIT_INSTANCE_READY, DeploymentEventType.NOT_STARTED],
    [DeploymentEvents.INSTALL_KWILD, DeploymentEventType.NOT_STARTED],
    [DeploymentEvents.REGISTER_DOMAIN, DeploymentEventType.NOT_STARTED],
    [DeploymentEvents.FINALIZE_DEPLOYMENT, DeploymentEventType.NOT_STARTED],
    [DeploymentEvents.START_INSTANCE, DeploymentEventType.START],
    [DeploymentEvents.STOP_INSTANCE, DeploymentEventType.START],
  ])

  const [status, setStatus] = useState<DeploymentStatus | undefined>(undefined)
  const [progress, setProgress] =
    useState<Map<DeploymentEvents, DeploymentEventType>>(deploymentEventMap)
  const [lastDeploymentStatus, setLastDeploymentStatus] =
    useState<DeploymentStatus | null>(null)

  const sseRef = useRef<EventSource | null>(null)

  const updateDeploymentProgress = useCallback(
    (data: DeploymentStreamMessage) => {
      console.log("data", data)
      if (data.payload?.event && data.payload?.type) {
        const { event, type } = data.payload
        // Check if the event is in DeploymentEvents and is not one of the excluded events
        if (
          Object.values(DeploymentEvents).includes(event as DeploymentEvents) &&
          !(
            event === DeploymentEvents.START_INSTANCE ||
            event === DeploymentEvents.STOP_INSTANCE
          )
        ) {
          setProgress((prev) => {
            console.log(prev) // changed from progress to prev
            const newMap = new Map(prev)
            const eventIndex = Object.values(DeploymentEvents).indexOf(
              event as DeploymentEvents,
            )

            // If the event is a start or finish, mark all previous events as finished
            if (
              type === DeploymentEventType.START ||
              type === DeploymentEventType.FINISH
            ) {
              for (let i = 0; i < eventIndex; i++) {
                newMap.set(
                  Object.values(DeploymentEvents)[i],
                  DeploymentEventType.FINISH,
                )
              }
            }

            // Set the current event
            newMap.set(event, type)
            return newMap
          })
        }
      }
    },
    [],
  )

  const updateDeploymentStatus = useCallback(
    (data: DeploymentStreamMessage) => {
      console.log("Updating deployment status", data)
      if (data.status) {
        console.log("Deployment status:", data.status)
        console.log("Payload:", data.payload)

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
      }
    },
    [],
  )

  const handleMessage = useCallback(
    (event: Event) => {
      if (event instanceof MessageEvent) {
        const data: DeploymentStreamMessage = JSON.parse(event.data)
        console.log("SSE: Client received a message", data)
        updateDeploymentProgress(data)
        updateDeploymentStatus(data)
      }
    },
    [updateDeploymentProgress, updateDeploymentStatus],
  )

  // To keep method consistent with the event stream and avoid unnecessary call errors
  useEffect(() => {
    if (deploymentStatus === DeploymentStatus.STARTING) {
      setLastDeploymentStatus(DeploymentStatus.STARTING)
    } else if (
      deploymentStatus === DeploymentStatus.STOPPING ||
      deploymentStatus === DeploymentStatus.STOPPED
    ) {
      setLastDeploymentStatus(DeploymentStatus.STOPPING)
    } else if (deploymentStatus === DeploymentStatus.DEPLOYING) {
      setLastDeploymentStatus(DeploymentStatus.DEPLOYING)
    }
  }, [deploymentStatus])

  const getMethod = (): string => {
    if (deploymentStatus === DeploymentStatus.STARTING) {
      return "follow_deployment_start"
    } else if (
      deploymentStatus === DeploymentStatus.STOPPING ||
      deploymentStatus === DeploymentStatus.STOPPED
    ) {
      return "follow_deployment_stop"
    } else if (deploymentStatus === DeploymentStatus.DEPLOYING) {
      return "follow_deployment"
    } else if (deploymentStatus === DeploymentStatus.ACTIVE) {
      return lastDeploymentStatus === DeploymentStatus.STARTING
        ? "follow_deployment_start"
        : "follow_deployment"
    }
    return "follow_deployment"
  }

  const method = getMethod()

  useEffect(() => {
    if (!sseUrl) {
      console.error("NEXT_PUBLIC_FIREBIRD_SSE_URL is not set")
      return
    }

    if (!sseRef.current) {
      console.log("SSE: useEffect - creating new EventSource")
      sseRef.current = new EventSource(
        `${sseUrl}?method=${method}&target=${deploymentId}`,
        {
          withCredentials: true,
        },
      )
    }

    console.log("SSE: useEffect - Adding event listeners", sseRef.current)

    const addListener = (event: string, handler: EventListener) => {
      console.log(`SSE: Adding ${event} listener`)
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

    // Only close the connection when the component unmounts
    return () => {
      console.log("Component unmounting, closing SSE connection")
      if (sseRef.current) {
        sseRef.current.close()
        sseRef.current = null
      }
    }
  }, [deploymentId, method, handleMessage])

  return { status, progress }
}

export default useEventStream
