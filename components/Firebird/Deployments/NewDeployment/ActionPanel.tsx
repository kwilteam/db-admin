import { FinalOptionsStep } from "./Step/FinalOptions"

export default function ActionPanel() {
  return (
    <div className="flex select-none flex-row items-center justify-center gap-2 border-t border-slate-200 bg-slate-50 p-2 text-sm">
      {<FinalOptionsStep />}
    </div>
  )
}
