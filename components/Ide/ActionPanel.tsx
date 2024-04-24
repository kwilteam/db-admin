import { DeployIcon, DownloadIcon } from "@/utils/icons"
import Loading from "../Loading"
import Button from "../Button"

interface IDeployProps {
  deploy: () => void
  exportJson: () => void
  isLoading: boolean
}

export default function ActionPanel({ deploy, exportJson, isLoading }: IDeployProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <Button context="secondary" disabled={isLoading} onClick={() => deploy()}>
        <DeployIcon className="mr-1" /> Deploy
      </Button>
      <Button content="secondary" disabled={isLoading} onClick={() => exportJson()}>
        <DownloadIcon className="mr-1" /> Export JSON
      </Button>
      {isLoading && <Loading />}
    </div>
  )
}
