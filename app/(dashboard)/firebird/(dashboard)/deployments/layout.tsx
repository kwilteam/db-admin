"use client"

import Header from "@/components/Firebird/Deployments/Header"
import DeleteDeploymentModal from "@/components/Modal/DeleteDeployment"
import TalkWithTeamModal from "@/components/Modal/TalkWithTeam"

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
