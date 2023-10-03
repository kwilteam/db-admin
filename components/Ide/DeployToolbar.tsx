import { IDeployOutcome } from "@/hooks/useIde"
import React from "react"
import Loading from "../Loading"
import Alert from "../Alert"
import Button from "../Button"
import { DeployIcon } from "@/utils/icons"

interface IDeployProps {
  deploy: () => void
  isLoading: boolean
  outcome: IDeployOutcome | undefined
}

export default function DeployToolbar({
  deploy,
  isLoading,
  outcome,
}: IDeployProps) {
  return (
    <>
      <Button context="secondary" disabled={isLoading} onClick={() => deploy()}>
        <DeployIcon className="mr-1" /> Deploy
      </Button>
      {isLoading && <Loading className="ml-2 mt-2 flex" />}
      {outcome?.status && outcome.message && (
        <Alert type={outcome.status} text={outcome.message} />
      )}
    </>
  )
}
