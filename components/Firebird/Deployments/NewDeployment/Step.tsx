import { Montserrat } from "next/font/google"
import classNames from "classnames"

const heading = Montserrat({
  weight: "500",
  subsets: ["latin"],
})

interface IStepProps {
  step: number
  icon: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
}

export function Step({ step, icon, title, description, children }: IStepProps) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            {icon}

            <h2
              className={classNames({
                [heading.className]: true,
                "text-xl leading-tight tracking-tighter text-slate-700": true,
              })}
            >
              {title}
            </h2>
          </div>
          <p className="text-sm text-slate-500">{description}</p>
        </div>

        <div className="flex flex-row gap-2 p-2 text-slate-500">
          <span>Step {step} / 5</span>
        </div>
      </div>

      {/* <div className="flex w-full flex-row gap-2">{children}</div> */}

      <>{children}</>
    </div>
  )
}
