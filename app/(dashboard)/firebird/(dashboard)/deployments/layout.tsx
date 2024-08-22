import Header from "@/components/Firebird/Deployments/Header"

export default function FirebirdDeploymentsLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
      <Header />

      {children}
    </div>
  )
}
