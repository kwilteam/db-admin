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
        "flex cursor-pointer items-center rounded-md p-3 text-sm": true,
        "bg-kwil-light/20 text-kwil-dark": context === "primary",
        "bg-slate-200/50 text-slate-500": context === "secondary",
        [props.className as string]: props.className !== undefined,
      })}
    >
      {children}
    </button>
  )
}
