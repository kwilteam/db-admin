"use client"

import ExistingDeployment from "@/components/Firebird/Deployments/ExistingDeployment"
import { NewDeploymentForm } from "@/components/Firebird/Deployments/NewDeployment/Form"
import TalkWithTeamModal from "@/components/Firebird/Deployments/NewDeployment/TalkWithTeamModal"

export default function DeploymentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const isNew = id === "new"

  return (
    <>
      <div className="flex flex-col overflow-y-scroll">
        {isNew ? <NewDeploymentForm /> : <ExistingDeployment id={id} />}
      </div>

      <TalkWithTeamModal />
    </>
  )
}
