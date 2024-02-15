import classNames from "classnames"
import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  testId?: string
  error?: boolean
}

export default function Input({
  testId,
  className,
  error,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      data-testid={testId}
      className={classNames(
        "block flex-1 rounded-md border bg-transparent p-2 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:leading-6",
        {
          "border-slate-300": !error,
          "border-red-500": error,
          [className ?? ""]: className,
        },
      )}
    />
  )
}
