"use client"

import Header from "@/components/Firebird/Deployments/Header"
import DeleteDeploymentModal from "@/components/Modal/DeleteDeployment"
import DeleteNodeModal from "@/components/Modal/DeleteNode"
import TalkWithTeamModal from "@/components/Modal/TalkWithTeam"

export default function FirebirdDeploymentsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />

      {children}

      <DeleteDeploymentModal />
      <DeleteNodeModal />
      <TalkWithTeamModal />
    </>
  )
}
