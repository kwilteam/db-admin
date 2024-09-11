import FirebirdNavigation from "@/components/Firebird/Navigation"

export default function FirebirdLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row">
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
