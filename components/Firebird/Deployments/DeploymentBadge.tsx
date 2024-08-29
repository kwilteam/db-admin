import classNames from "classnames"

export const DeploymentBadge = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={classNames(
        "flex flex-row items-center gap-2 rounded-md border border-slate-100 bg-white p-2",
        className,
      )}
    >
      {children}
    </div>
  )
}
