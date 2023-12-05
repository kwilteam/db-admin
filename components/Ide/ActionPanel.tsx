import { DeployIcon } from "@/utils/icons"
import Loading from "../Loading"
import Button from "../Button"

interface IDeployProps {
  deploy: () => void
  isLoading: boolean
}

export default function ActionPanel({ deploy, isLoading }: IDeployProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <Button context="secondary" disabled={isLoading} onClick={() => deploy()}>
        <DeployIcon className="mr-1" /> Deploy
      </Button>
      {isLoading && <Loading />}
    </div>
  )
}
