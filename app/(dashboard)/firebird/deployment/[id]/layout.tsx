import { redirect } from "next/navigation"

export default function DeploymentsHomeLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
      {children}
    </div>
  )
}
