import FirebirdNavigation from "@/components/Firebird/Navigation"

export default function FirebirdLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row">
      {/* Martin: This may be needed in the future but hidden for now */}
      {/* <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <div className="w-full bg-white">
          <DeploymentsNavigation />
        </div>
      </div> */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
