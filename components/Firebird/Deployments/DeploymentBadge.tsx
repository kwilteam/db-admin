import classNames from "classnames"

export const DeploymentBadge = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  className?: string
  info?: string
}) => {
  return (
    <div
      className={classNames(
        "relative flex cursor-default select-none flex-row items-center gap-2 rounded-md border border-slate-100 bg-white p-2",

        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const LargeDeploymentBadge = ({
  children,
  className,
  info,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  className?: string
  info: string
}) => {
  return (
    <div
      className={classNames(
        "relative flex cursor-default select-none flex-row items-center gap-2 rounded-md border border-slate-100 bg-white px-8 py-6",
        className,
      )}
      {...props}
    >
      {children}
      {info && (
        <div className="absolute bottom-0 left-0 top-0 flex items-center justify-center border-l border-slate-100 bg-slate-50 px-1 text-xs text-slate-500">
          <span className="rotate-180" style={{ writingMode: "vertical-rl" }}>
            {info}
          </span>
        </div>
      )}
    </div>
  )
}
