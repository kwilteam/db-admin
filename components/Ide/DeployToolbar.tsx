import { IDeployOutcome } from "@/hooks/useIde"
import React from "react"
import Loading from "../Loading"
import Alert from "../Alert"
import Button from "../Button"

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
      <Button context="primary" disabled={isLoading} onClick={() => save()}>
        Deploy
      </Button>
      {isLoading && <Loading className="ml-2 flex items-center" />}
      {outcome?.status && outcome.message && (
        <Alert type={outcome.status} text={outcome.message} />
      )}
    </>
  )
}
