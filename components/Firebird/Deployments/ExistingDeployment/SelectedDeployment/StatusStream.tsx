import classNames from "classnames"
import { DeploymentStatus } from "@/utils/firebird/types"
import { DeploymentEventType, EventStreamEvents } from "@/utils/firebird/types"
import Loading from "@/components/Loading"
import {
  DeploymentStepFailedIcon,
  DeploymentStepFinishedIcon,
} from "@/utils/icons"

export default function StatusStream({
  status,
  progress,
}: {
  status: DeploymentStatus | undefined
  progress: Map<EventStreamEvents, DeploymentEventType>
}) {
  if (status === DeploymentStatus.ACTIVE) return null

  const eventDisplayNames =
    status === DeploymentStatus.STARTING
      ? {
          [EventStreamEvents.START_INSTANCE]: "Starting Instance",
        }
      : {
          [EventStreamEvents.STOP_INSTANCE]: "Stopping Instance",
        }

  const orderedEvents = Object.keys(eventDisplayNames) as EventStreamEvents[]

  return (
    <div className="flex flex-col gap-2 text-sm xl:ml-16">
      {orderedEvents.map((event, index) => {
        const eventType = progress.get(event) || DeploymentEventType.NOT_STARTED

        return (
          <div className="flex flex-row items-center gap-3" key={event}>
            <span
              className={classNames({
                flex:
                  eventType === DeploymentEventType.START ||
                  DeploymentEventType.NOT_STARTED, // Stop deployment API doesn't not handle START.
              })}
            >
              <Loading className="h-4 w-4" />
            </span>

            <span
              className={classNames("text-kwil", {
                flex: eventType === DeploymentEventType.FINISH,
                hidden: eventType !== DeploymentEventType.FINISH,
              })}
            >
              <DeploymentStepFinishedIcon className="h-4 w-4" />
            </span>

            <span
              className={classNames("text-red-500", {
                flex: eventType === DeploymentEventType.FAIL,
                hidden: eventType !== DeploymentEventType.FAIL,
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
