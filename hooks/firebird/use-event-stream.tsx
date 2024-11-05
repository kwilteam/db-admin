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

/**
// the statuses to open the event stream
// Excluded => ACTIVE, STOPPED (don't open event stream)
 */
const eventStreamStatuses = [
  DeploymentStatus.DEPLOYING,
  DeploymentStatus.STARTING,
  DeploymentStatus.STOPPING,
  DeploymentStatus.PENDING,
]

const useEventStream = (
  deploymentId: string,
  deploymentStatus?: DeploymentStatus,
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

  const sseRef = useRef<EventSource | null>(null)

  const updateDeploymentProgress = useCallback(
    (data: DeploymentStreamMessage) => {
      console.log("data", data)
      if (data.payload?.event && data.payload?.type) {
        const { event, type } = data.payload
        // Check if the event is in DeploymentEvents and is not one of the excluded events
        if (
          Object.values(DeploymentEvents).includes(event) &&
          !(
            event === DeploymentEvents.START_INSTANCE ||
            event === DeploymentEvents.STOP_INSTANCE
          )
        ) {
          setProgress((prev) => {
            console.log(prev) // changed from progress to prev
            const newMap = new Map(prev)
            const eventIndex = Object.values(DeploymentEvents).indexOf(event)

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

  /**
   * need to follow the appropriate event stream based on the instance action taking place (Start, Deploy, Stop)
   * @returns method string for the event stream api call
   */
  const getMethod = useCallback(
    (deploymentStatus: DeploymentStatus): string => {
      switch (deploymentStatus) {
        case DeploymentStatus.STARTING:
          return "follow_deployment_start"
        case DeploymentStatus.STOPPING:
          return "follow_deployment_stop"
        case DeploymentStatus.DEPLOYING:
          return "follow_deployment"
        case DeploymentStatus.PENDING:
          return "follow_deployment"
        default:
          return "follow_deployment"
      }
    },
    [],
  )

  useEffect(() => {
    // only open event stream if we are deploying, starting, or stopping
    if (
      deploymentStatus === undefined ||
      !eventStreamStatuses.includes(deploymentStatus)
    ) {
      return
    }

    if (!sseUrl) {
      console.error("NEXT_PUBLIC_FIREBIRD_SSE_URL is not set")
      return
    }

    // Open EventSource only if there is an active action, and close it otherwise
    if (!sseRef.current) {
      console.log("SSE: useEffect - creating new EventSource")
      sseRef.current = new EventSource(
        `${sseUrl}?method=${getMethod(deploymentStatus)}&target=${deploymentId}`,
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
  }, [deploymentId, deploymentStatus, handleMessage])

  return { status, progress }
}

export default useEventStream
