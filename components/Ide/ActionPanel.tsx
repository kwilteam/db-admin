import { DeployIcon, DownloadIcon } from "@/utils/icons"
import Loading from "../Loading"
import Button from "../Button"
import { useWindowSize } from "@/hooks/use-window-size"

interface IDeployProps {
  deploy: () => void
  exportSql: () => void
  isLoading: boolean
}

export default function ActionPanel({
  deploy,
  exportSql,
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
        onClick={() => exportSql()}
      >
        <DownloadIcon className="mr-1" /> Export SQL
      </Button>
      {isLoading && <Loading />}
    </div>
  )
}
