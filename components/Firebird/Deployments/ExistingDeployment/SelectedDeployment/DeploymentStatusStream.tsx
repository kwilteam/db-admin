import classNames from "classnames"
import { DeploymentStatus } from "@/utils/firebird/types"
import { DeploymentEventType } from "@/utils/firebird/types"
import { DeploymentEvents } from "@/hooks/firebird/use-deployment-event-stream"
import Loading from "@/components/Loading"
import {
  DeploymentStepFailedIcon,
  DeploymentStepFinishedIcon,
  DeploymentStepPendingIcon,
} from "@/utils/icons"

export default function DeploymentStatusStream({
  status,
  progress,
}: {
  status: DeploymentStatus | undefined
  progress: Map<DeploymentEvents, DeploymentEventType>
}) {
  if (status === DeploymentStatus.ACTIVE) return

  const eventDisplayNames = {
    [DeploymentEvents.INIT_KEY_PAIR]: "Initializing Key Pair",
    [DeploymentEvents.CREATE_INSTANCE]: "Creating Instance",
    [DeploymentEvents.WAIT_INSTANCE_READY]: "Starting Instance",
    [DeploymentEvents.INSTALL_KWILD]: "Installing Kwil Daemon",
    [DeploymentEvents.REGISTER_DOMAIN]: "Registering Domain",
    [DeploymentEvents.FINALIZE_DEPLOYMENT]: "Finalizing Deployment",
  }

  const orderedEvents = Object.keys(eventDisplayNames) as DeploymentEvents[]

  return (
    <div className="flex flex-col gap-2 text-sm xl:ml-16">
      {orderedEvents.map((event, index) => {
        const eventType = progress.get(event) || DeploymentEventType.NOT_STARTED
        const prevEvent = index > 0 ? orderedEvents[index - 1] : null
        const prevEventType = prevEvent ? progress.get(prevEvent) : null

        // Set current event to START if previous event is FINISH and current is NOT_STARTED
        const displayEventType =
          eventType === DeploymentEventType.NOT_STARTED &&
          prevEventType === DeploymentEventType.FINISH
            ? DeploymentEventType.START
            : eventType

        return (
          <div className="flex flex-row items-center gap-3" key={event}>
            <span
              className={classNames({
                flex: displayEventType === DeploymentEventType.NOT_STARTED,
                hidden: displayEventType !== DeploymentEventType.NOT_STARTED,
              })}
            >
              <DeploymentStepPendingIcon className="h-4 w-4 p-1" />
            </span>

            <span
              className={classNames({
                flex: displayEventType === DeploymentEventType.START,
                hidden: displayEventType !== DeploymentEventType.START,
              })}
            >
              <Loading className="h-4 w-4" />
            </span>

            <span
              className={classNames("text-kwil", {
                flex: displayEventType === DeploymentEventType.FINISH,
                hidden: displayEventType !== DeploymentEventType.FINISH,
              })}
            >
              <DeploymentStepFinishedIcon className="h-4 w-4" />
            </span>

            <span
              className={classNames("text-red-500", {
                flex: displayEventType === DeploymentEventType.FAIL,
                hidden: displayEventType !== DeploymentEventType.FAIL,
              })}
            >
              <DeploymentStepFailedIcon className="h-4 w-4" />
            </span>

            <span>{eventDisplayNames[event]}</span>
          </div>
        )
      })}
    </div>
  )
}
