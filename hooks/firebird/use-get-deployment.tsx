import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { useAppDispatch } from "@/store/hooks"
import { getDeployment } from "@/utils/firebird/api"
import { setSelectedDeployment } from "@/store/firebird"
import { DeploymentStatus } from "@/utils/firebird/types"
import { setAlert } from "@/store/global"

export default function useGetDeployment(
  id: string,
  deploymentStreamStatus: DeploymentStatus | undefined,
) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const loadAsync = useCallback(async () => {
    const { status, data } = await getDeployment(id)

    if (status === 200 && data) {
      dispatch(setSelectedDeployment(data))
    } else {
      dispatch(setSelectedDeployment(undefined))
      dispatch(
        setAlert({
          type: "error",
          text: "Failed to fetch deployment",
        }),
      )
      router.push("/firebird/deployments")
    }
  }, [id, dispatch, router])

  useEffect(() => {
    loadAsync()

    return () => {
      dispatch(setSelectedDeployment(undefined))
    }
  }, [id, dispatch, router, loadAsync])

  // For when the deployment status changes to active, get all the deployment data and set to the selected deployment
  useEffect(() => {
    if (
      deploymentStreamStatus === DeploymentStatus.ACTIVE ||
      deploymentStreamStatus === DeploymentStatus.STOPPED
    ) {
      loadAsync()
    }
  }, [deploymentStreamStatus, loadAsync])
}
