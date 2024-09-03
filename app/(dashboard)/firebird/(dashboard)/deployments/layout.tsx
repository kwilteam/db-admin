"use client"

import Header from "@/components/Firebird/Deployments/Header"
import DeleteDeploymentModal from "@/components/Firebird/Deployments/NewDeployment/DeleteDeploymentModal"
import TalkWithTeamModal from "@/components/Firebird/Deployments/NewDeployment/TalkWithTeamModal"

export default function FirebirdDeploymentsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />

      {children}

      <DeleteDeploymentModal />
      <TalkWithTeamModal />
    </>
  )
}
