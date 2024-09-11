import { getNodes } from "@/utils/firebird/api"
import { IFirebirdApiNode } from "@/utils/firebird/types"
import { useEffect, useState } from "react"

export default function useNodes(deploymentId: string) {
  const [loading, setLoading] = useState(true)
  const [nodes, setNodes] = useState<IFirebirdApiNode[] | undefined>(undefined)

  useEffect(() => {
    const fetchNodes = async () => {
      setLoading(true)
      const { status, data } = await getNodes(deploymentId)
      if (status === 200 && data) {
        setNodes(data)
      } else if (status === 404) {
        setNodes([])
      } else {
        setNodes([])
        console.error("Failed to fetch nodes", status, data)
      }
      setLoading(false)
    }

    fetchNodes()
  }, [deploymentId])

  return { loading, nodes }
}
