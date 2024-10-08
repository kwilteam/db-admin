import { useState, useEffect, useCallback, useRef } from "react"
import { DeploymentStatus } from "@/utils/firebird/types"

const sseUrl = process.env.NEXT_PUBLIC_FIREBIRD_SSE_URL

interface DeploymentStreamMessage {
  status: DeploymentStatus
  payload: {
    event: DeploymentEvents
    type: DeploymentEventType
  }
}

export enum DeploymentEventType {
  NOT_STARTED = "NOT_STARTED",
  START = "START",
  FINISH = "FINISH",
  FAIL = "FAIL",
}

export enum DeploymentEvents {
  INIT_KEY_PAIR = "INIT_KEY_PAIR",
  CREATE_INSTANCE = "CREATE_INSTANCE",
  WAIT_INSTANCE_READY = "WAIT_INSTANCE_READY",
  INSTALL_KWILD = "INSTALL_KWILD",
  REGISTER_DOMAIN = "REGISTER_DOMAIN",
  FINALIZE_DEPLOYMENT = "FINALIZE_DEPLOYMENT",
}

const useDeploymentEventStream = (deploymentId: string) => {
  const [status, setStatus] = useState<DeploymentStatus | undefined>(undefined)
  const [progress, setProgress] = useState<
    Map<DeploymentEvents, DeploymentEventType>
  >(
    new Map([
      [DeploymentEvents.INIT_KEY_PAIR, DeploymentEventType.START],
      [DeploymentEvents.CREATE_INSTANCE, DeploymentEventType.NOT_STARTED],
      [DeploymentEvents.WAIT_INSTANCE_READY, DeploymentEventType.NOT_STARTED],
      [DeploymentEvents.INSTALL_KWILD, DeploymentEventType.NOT_STARTED],
      [DeploymentEvents.REGISTER_DOMAIN, DeploymentEventType.NOT_STARTED],
      [DeploymentEvents.FINALIZE_DEPLOYMENT, DeploymentEventType.NOT_STARTED],
    ]),
  )

  const sseRef = useRef<EventSource | null>(null)

  const updateDeploymentProgress = useCallback(
    (data: DeploymentStreamMessage) => {
      console.log("Updating deployment progress", data)
      if (data.payload?.event && data.payload?.type) {
        const { event, type } = data.payload
        if (Object.values(DeploymentEvents).includes(event)) {
          setProgress((prev) => {
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
        setStatus(data.status)
        console.log("Deployment status:", data.status)
        console.log("Payload:", data.payload)

        const finalStatuses = [
          DeploymentStatus.ACTIVE,
          DeploymentStatus.FAILED,
          DeploymentStatus.TERMINATED,
        ]

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

  useEffect(() => {
    if (!sseUrl) {
      console.error("NEXT_PUBLIC_FIREBIRD_SSE_URL is not set")
      return
    }

    if (!sseRef.current) {
      console.log("SSE: useEffect - creating new EventSource")
      sseRef.current = new EventSource(
        `${sseUrl}?method=follow_deployment&target=${deploymentId}`,
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
  }, [deploymentId, handleMessage])

  return { status, progress }
}

export default useDeploymentEventStream
