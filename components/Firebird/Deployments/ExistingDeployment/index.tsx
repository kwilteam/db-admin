import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectActiveDeployment, setActiveDeployment } from "@/store/firebird"
import { getDeployment } from "@/utils/firebird/api"
import Loading from "@/components/Loading"
import ActiveDeploymentCard from "../ActiveDeploymentCard"

export default function ExistingDeployment({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const activeDeployment = useAppSelector(selectActiveDeployment)

  useEffect(() => {
    const loadAsync = async () => {
      const { status, data } = await getDeployment(id)

      if (status === 200 && data) {
        dispatch(setActiveDeployment(data))
      }
    }

    loadAsync()

    return () => {
      dispatch(setActiveDeployment(undefined))
    }
  }, [id, dispatch])

  console.log(activeDeployment, "activeDeployment")

  if (!activeDeployment) {
    return (
      <div className="flex w-full justify-center pt-4">
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <ActiveDeploymentCard deployment={activeDeployment} />
    </div>
  )
}
