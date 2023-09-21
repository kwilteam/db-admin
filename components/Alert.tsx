import { InfoIcon, ErrorIcon } from "@/utils/icons"
import classNames from "classnames"

interface IAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  type: "info" | "error"
}

export default function Alert({ text, type, ...props }: IAlertProps) {
  return (
    <div
      {...props}
      className={classNames({
        "flex items-center rounded-md p-3 text-sm": true,
        "bg-red-200/50 text-red-500": type === "error",
        "bg-blue-200/50 text-blue-500": type === "info",
        [props.className as string]: props.className !== undefined,
      })}
    >
      {type === "info" && <InfoIcon className="mr-2 h-6 w-6" />}
      {type === "error" && <ErrorIcon className="mr-2 h-6 w-6" />}

      {text}
    </div>
  )
}
