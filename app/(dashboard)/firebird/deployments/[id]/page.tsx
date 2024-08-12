"use client"

import { NewDeploymentForm } from "@/components/Firebird/Deployments/NewDeployment/Form"

export default function DeploymentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const isNew = id === "new"

  return (
    <div className="flex flex-col overflow-y-scroll">
      {isNew ? <NewDeploymentForm /> : <>Existing Deployment {id}</>}
    </div>
  )
}
