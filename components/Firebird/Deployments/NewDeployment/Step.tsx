import { Montserrat } from "next/font/google"
import classNames from "classnames"
import { useAppSelector } from "@/store/hooks"
import { selectCurrentStep } from "@/store/firebird"

const heading = Montserrat({
  weight: "500",
  subsets: ["latin"],
})

interface IStepProps {
  step: number
  title: string
  description: string
  children: React.ReactNode
}

export function Step({ step, title, description, children }: IStepProps) {
  const currentStep = useAppSelector(selectCurrentStep)

  if (currentStep < step) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2
            className={classNames({
              [heading.className]: true,
              "text-xl leading-tight tracking-tighter text-slate-700": true,
            })}
          >
            {title}
          </h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>

        <div className="flex flex-row gap-2 p-2 text-slate-500">
          <span>Step {step} / 6</span>
        </div>
      </div>

      {/* <div className="flex w-full flex-row gap-2">{children}</div> */}

      <>{children}</>
    </div>
  )
}
