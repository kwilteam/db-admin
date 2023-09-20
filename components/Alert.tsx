import { InfoIcon, ErrorIcon } from "@/util/icons"
import classNames from "classnames"

interface IAlertProps {
  text: string
  type: "info" | "error"
}

export default function Alert({ text, type }: IAlertProps) {
  return (
    <div
      className={classNames({
        "flex items-center rounded-md p-3 text-sm": true,
        "bg-red-200/50 text-red-500": type === "error",
        "bg-blue-200/50 text-blue-500": type === "info",
      })}
    >
      {type === "info" && <InfoIcon className="mr-2 h-6 w-6" />}
      {type === "error" && <ErrorIcon className="mr-2 h-6 w-6" />}

      {text}
    </div>
  )
}
