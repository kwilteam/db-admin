import { DeployIcon, DownloadIcon } from "@/utils/icons"
import Loading from "../Loading"
import Button from "../Button"
import { useWindowSize } from "@/hooks/use-window-size"

interface IDeployProps {
  deploy: () => void
  exportJson: () => void
  isLoading: boolean
}

export default function ActionPanel({
  deploy,
  exportJson,
  isLoading,
}: IDeployProps) {
  const windowSize = useWindowSize()
  const buttonSize = windowSize === "sm" || windowSize === "md" ? "sm" : "md"

  return (
    <div className="flex w-full items-center gap-3">
      <Button
        context="primary"
        size={buttonSize}
        disabled={isLoading}
        onClick={() => deploy()}
      >
        <DeployIcon className="mr-1" /> Deploy
      </Button>
      <Button
        context="secondary"
        size={buttonSize}
        disabled={isLoading}
        onClick={() => exportJson()}
      >
        <DownloadIcon className="mr-1" /> Export JSON
      </Button>
      {isLoading && <Loading />}
    </div>
  )
}
