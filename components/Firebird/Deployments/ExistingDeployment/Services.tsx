import { useState, useEffect } from "react"
import classNames from "classnames"
import Loading from "@/components/Loading"
import { getDeploymentServices } from "@/utils/firebird/api"
import { IFirebirdApiService } from "@/utils/firebird/types"

export default function Services({ deploymentId }: { deploymentId: string }) {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState<IFirebirdApiService[] | undefined>(
    undefined,
  )

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true)

      const { status, data } = await getDeploymentServices(deploymentId)
      if (status === 200 && data) {
        setServices(data)
      } else if (status === 404) {
        setServices([])
      } else {
        setServices([])
        console.error("Failed to fetch services", status, data)
      }

      setLoading(false)
    }

    setLoading(false)
    fetchServices()
  }, [deploymentId])

  if (!services) {
    return <Loading className="mb-1" />
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {!loading && services && !services.length && (
        <div className="text-sm text-slate-500">No services found</div>
      )}

      {services &&
        services.map((service) => (
          <div
            key={service.id}
            className="flex grow cursor-pointer select-none flex-col gap-2 rounded-md border border-slate-100 bg-slate-50/30 p-2 hover:border-slate-100 hover:bg-slate-50/60"
          >
            <h2 className="flex flex-row items-center gap-2 text-sm font-medium">
              <div className="text-sm">{service.name}</div>
              <div
                className={classNames({
                  "h-2 w-2 rounded-full border border-slate-100": true,
                  "bg-emerald-500/80": service.running,
                  "bg-red-500/80": !service.running,
                })}
              />
              <span className="text-xs text-slate-500">
                {service.running ? "Running" : "Stopped"}
              </span>
            </h2>

            <div className="flex flex-row gap-1">
              <span className="text-xs font-bold text-slate-500">
                Endpoint:
              </span>
              <span className="text-xs text-slate-500">
                {service?.endpoint?.length > 0 ? service.endpoint : "-"}
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}
