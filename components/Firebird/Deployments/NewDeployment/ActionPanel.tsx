import { FinalOptionsStep } from "./Step/FinalOptions"

export default function ActionPanel() {
  return (
    <div className="max-w-screen lg:text-md flex h-10 select-none flex-row items-center justify-evenly gap-2 border-t border-slate-200 bg-slate-50 p-2 text-sm">
      {<FinalOptionsStep />}
    </div>
  )
}
