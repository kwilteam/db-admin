import classNames from "classnames"

export default function Tooltip({ ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={classNames(
        "absolute hidden w-auto rounded-lg bg-black/75 p-2 text-xs text-white group-hover:block",
        {
          [props.className as string]: props.className !== undefined,
        },
      )}
    >
      {props.children}
    </span>
  )
}
