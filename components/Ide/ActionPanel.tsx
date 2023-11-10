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
    <div className="flex w-full items-center gap-3">
      <Button context="secondary" disabled={isLoading} onClick={() => deploy()}>
        <DeployIcon className="mr-1" /> Deploy
      </Button>
      {isLoading && <Loading />}
      {outcome?.status && outcome.message && (
        <Alert
          test-id="deploy-outcome"
          type={outcome.status}
          text={outcome.message}
          className="hidden md:flex"
        />
      )}
    </div>
  )
}
