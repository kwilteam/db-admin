"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { DeployIcon, FirebirdIcon } from "@/utils/icons"
import { getDeployments } from "@/utils/firebird/api"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setAlert } from "@/store/global"
import { selectDeployments, setDeployments } from "@/store/firebird"
import DeploymentCard from "@/components/Firebird/Deployments/DeploymentCard"
import Loading from "@/components/Loading"

export default function DeploymentList() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const deployments = useAppSelector(selectDeployments)

  useEffect(() => {
    const loadAsync = async () => {
      try {
        const { status, data } = await getDeployments()

        if (status === 200 && data) {
          dispatch(setDeployments(data.result))
        } else {
          dispatch(
            setAlert({
              text: "There was a problem loading your deployments",
              type: "error",
            }),
          )
          dispatch(setDeployments([]))
        }
      } catch (err) {
        setError("Failed to fetch deployments")
      } finally {
        setLoading(false)
      }
    }

    loadAsync()
  }, [dispatch])

  if (loading) {
    return (
      <div
        className="flex w-full justify-center pt-4"
        data-testid="loading-icon"
      >
        <Loading />
      </div>
    )
  }

  if (error) {
    return <div data-testid="error-message">{error}</div>
  }

  return (
    <>
      <div className="flex-1 overflow-auto bg-white">
        {deployments && deployments.length === 0 && <CreateFirstDeployment />}

        {deployments && deployments.length > 0 && (
          <div
            data-testid="deployment-list"
            className="m-2 grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3"
          >
            {deployments.map((deployment: any) => (
              <DeploymentCard key={deployment.id} deployment={deployment} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function CreateFirstDeployment() {
  return (
    <div
      data-testid="deploy-first-kwil-network"
      className="mt-16 flex max-h-mobile flex-col items-center justify-center gap-4 lg:mt-0 lg:min-h-mobile"
    >
      <FirebirdIcon className="h-12 w-12 text-gray-600" />
      <h1 className="text-lg tracking-tight text-gray-900 lg:text-xl">
        Deploy your first Kwil network!
      </h1>
      <p className="text-sm text-gray-500">
        Firebird makes it easy to deploy and <br />
        manage Kwil networks in the cloud.
      </p>
      <Link href="/firebird/deployments/new">
        <button className="flex flex-row items-center rounded-md bg-kwil/90 px-4 py-2 text-sm font-medium text-white hover:bg-kwil/80">
          <DeployIcon className="mr-2 h-5 w-5" /> Get Started
        </button>
      </Link>
    </div>
  )
}
