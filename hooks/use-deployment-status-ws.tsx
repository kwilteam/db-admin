import { useState, useEffect } from "react"
import { DeploymentStatus } from "@/utils/firebird/types"

const wsUrl = process.env.NEXT_PUBLIC_FIREBIRD_WS_URL

const useDeploymentStatusWebSocket = (
  deploymentId: string,
  initialStatus: DeploymentStatus,
) => {
  const [status, setStatus] = useState<DeploymentStatus>(initialStatus)

  useEffect(() => {
    if (
      status !== DeploymentStatus.PENDING &&
      status !== DeploymentStatus.DEPLOYING
    ) {
      console.log(
        "Not connecting to WS because status is not pending or deploying",
      )
      return
    }

    if (!wsUrl) {
      console.error("NEXT_PUBLIC_FIREBIRD_WS_URL is not set")
      return
    }

    const socket = new WebSocket(wsUrl)

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          method: "follow_deployment",
          params: [{ id: deploymentId }],
        }),
      )
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.status) {
        setStatus(data.status)

        if (
          data.status === DeploymentStatus.ACTIVE ||
          data.status === DeploymentStatus.FAILED ||
          data.status === DeploymentStatus.TERMINATED
        ) {
          socket.close()
        }
      }
    }

    return () => {
      socket.close()
    }
  }, [deploymentId, status])

  return status
}

export default useDeploymentStatusWebSocket
