"use client"

import Header from "@/components/Firebird/Deployments/Header"
import DeleteDeploymentModal from "@/components/Modal/DeleteDeployment"
import DeleteNodeModal from "@/components/Modal/DeleteNode"
import TalkWithTeamModal from "@/components/Modal/TalkWithTeam"
import ProviderConnectionModal from "@/components/Modal/ProviderConnection"

export default function DeploymentsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />

      {children}

      <DeleteDeploymentModal />
      <DeleteNodeModal />
      <ProviderConnectionModal />
      <TalkWithTeamModal />
    </>
  )
}
