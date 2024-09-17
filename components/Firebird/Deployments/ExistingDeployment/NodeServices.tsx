import Loading from "@/components/Loading"
import useDownloadLogs from "@/hooks/firebird/use-download-logs"
import useNodeServices from "@/hooks/firebird/use-node-services"
import { IFirebirdApiService, NodeStatus } from "@/utils/firebird/types"
import { DownloadLogsIcon, ServicesIcon } from "@/utils/icons"
import { Status } from "./Nodes"

export default function NodeServices({ nodeId }: { nodeId: string }) {
  const { services, loading } = useNodeServices(nodeId)

  return (
    <div className="flex cursor-default flex-col justify-start gap-2 rounded-md border border-slate-100 bg-white p-2">
      <div className="flex flex-col gap-2">
        <h3 className="flex flex-row items-center gap-2 text-sm font-medium">
          <ServicesIcon className="h-4 w-4" />
          Services
        </h3>
        {loading && <Loading className="mb-1" />}
        {!loading && services && !services.length && (
          <div className="text-xs">No services found</div>
        )}
        {!loading &&
          services &&
          services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
      </div>
    </div>
  )
}

const ServiceItem = ({ service }: { service: IFirebirdApiService }) => {
  const { downloadingLogs, downloadLogs } = useDownloadLogs()

  return (
    <div
      key={service.id}
      className="flex flex-row items-center gap-1 rounded-md border border-slate-100 p-3 py-3"
    >
      <h3 className="flex grow flex-row items-center gap-2 text-sm font-medium">
        <span>{service.name}</span>
        <Status
          status={service.running ? NodeStatus.RUNNING : NodeStatus.STOPPED}
        />
      </h3>
      <div
        className="flex cursor-pointer flex-row items-center gap-1 text-xs text-slate-500"
        onClick={(e) => downloadLogs(e, service.id, service.name)}
      >
        {downloadingLogs.has(service.id) ? (
          <Loading className="mr-1 h-4 w-4" />
        ) : (
          <>
            Logs <DownloadLogsIcon className="mr-1 h-5 w-5" />
          </>
        )}
      </div>
    </div>
  )
}
