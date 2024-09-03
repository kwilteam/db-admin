"use client"

import ActionPanel from "@/components/Firebird/Deployments/NewDeployment/ActionPanel"
import ExistingDeployment from "@/components/Firebird/Deployments/ExistingDeployment"
import { NewDeploymentForm } from "@/components/Firebird/Deployments/NewDeployment/Form"
import TalkWithTeamModal from "@/components/Firebird/Deployments/NewDeployment/TalkWithTeamModal"

export default function DeploymentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const isNew = id === "new"

  return (
    <>
      <div className="flex flex-col overflow-y-auto">
        {isNew ? <NewDeploymentForm /> : <ExistingDeployment id={id} />}
      </div>

      <TalkWithTeamModal />
      {isNew && <ActionPanel />}
    </>
  )
}
