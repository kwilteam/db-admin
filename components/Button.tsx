import classNames from "classnames"

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  context?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
}

export default function Button({
  children,
  context = "secondary",
  size = "sm",
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        "flex cursor-pointer select-none items-center rounded-md border",
        {
          "border-kwil/50 bg-kwil/30 text-kwil-dark hover:bg-kwil/40":
            context === "primary",
          "border-slate-200 bg-white text-slate-500 hover:bg-slate-200/50":
            context === "secondary",
          "border-red-500 bg-red-500/80 text-white hover:bg-red-600/80":
            context === "danger",
          "h-6 p-2 text-xs": size === "sm",
          "h-8 p-2 text-sm": size === "md",
          "h-10 p-3": size === "lg",
          [props.className as string]: props.className !== undefined,
          "cursor-not-allowed opacity-50": props.disabled,
        },
      )}
    >
      {children}
    </button>
  )
}
