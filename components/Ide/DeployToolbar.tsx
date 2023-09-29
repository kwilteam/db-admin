import { IDeployOutcome } from "@/hooks/useIde"
import React from "react"
import Loading from "../Loading"
import Alert from "../Alert"

interface IDeployProps {
  save: () => void
  isLoading: boolean
  outcome: IDeployOutcome | undefined
}

export default function DeployToolbar({
  save,
  isLoading,
  outcome,
}: IDeployProps) {
  return (
    <>
      <button
        className="cursor-pointer rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-kwil hover:bg-kwil hover:text-slate-100"
        disabled={isLoading}
        onClick={() => save()}
      >
        Deploy
      </button>
      {isLoading && <Loading className="p-1" />}
      {outcome?.status && outcome.message && (
        <Alert type={outcome.status} text={outcome.message} className="py-1" />
      )}
    </>
  )
}
