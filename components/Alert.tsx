import classNames from "classnames"
import { InfoIcon, ErrorIcon, SuccessIcon, WarningIcon } from "@/utils/icons"

export type IAlertType = "info" | "error" | "success" | "warning"

interface IAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  type: IAlertType
}

export default function Alert({ text, type, ...props }: IAlertProps) {
  return (
    <div
      test-id={`alert-${type}`}
      {...props}
      className={classNames({
        "flex select-none items-center rounded-md p-2 text-xs lg:text-sm": true,
        "bg-red-100/90 text-red-700": type === "error",
        "bg-blue-100/90 text-blue-700": type === "info",
        "bg-green-100/90 text-green-700": type === "success",
        "bg-yellow-100/90 text-yellow-700": type === "warning",
        [props.className as string]: props.className !== undefined,
      })}
    >
      <span>
        {type === "info" && <InfoIcon className="mr-2 h-6 w-6" />}
        {type === "error" && <ErrorIcon className="mr-2 h-6 w-6" />}
        {type === "success" && <SuccessIcon className="mr-2 h-6 w-6" />}
        {type === "warning" && <WarningIcon className="mr-2 h-6 w-6" />}
      </span>

      <span className="overflow-hidden">{text}</span>
    </div>
  )
}
