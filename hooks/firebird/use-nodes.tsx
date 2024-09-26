import { useEffect, useState } from "react"
import { selectDeploymentNodesById, setDeploymentNodes } from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getNodes } from "@/utils/firebird/api"

export default function useNodes(deploymentId: string) {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const nodes = useAppSelector(selectDeploymentNodesById(deploymentId))

  useEffect(() => {
    const fetchNodes = async () => {
      setLoading(true)
      const { status, data } = await getNodes(deploymentId)
      if (status === 200 && data) {
        dispatch(setDeploymentNodes({ deploymentId, nodes: data }))
      } else if (status === 404) {
        dispatch(setDeploymentNodes({ deploymentId, nodes: [] }))
      } else {
        dispatch(setDeploymentNodes({ deploymentId, nodes: [] }))
        console.error("Failed to fetch nodes", status, data)
      }
      setLoading(false)
    }

    fetchNodes()
  }, [deploymentId, dispatch])

  return { loading, nodes }
}
