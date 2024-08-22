import Header from "@/components/Firebird/Deployments/Header"

export default function FirebirdDeploymentsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />

      {children}
    </>
  )
}
