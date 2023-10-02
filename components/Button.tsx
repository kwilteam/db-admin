import classNames from "classnames"

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  context?: "primary" | "secondary"
}

export default function Button({
  children,
  context = "secondary",
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      className={classNames({
        "flex h-10 cursor-pointer items-center rounded-md p-2 text-sm": true,
        "bg-kwil/30 text-kwil-dark hover:bg-kwil/40": context === "primary",
        "bg-slate-200/50 text-slate-500 hover:bg-slate-200/80":
          context === "secondary",
        [props.className as string]: props.className !== undefined,
      })}
    >
      {children}
    </button>
  )
}
