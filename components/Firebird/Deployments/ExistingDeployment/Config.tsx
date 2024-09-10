import { IFirebirdDeploymentConfig } from "@/utils/firebird/types"

// TODO: Improve the UI

export default function Config({
  config,
}: {
  config: IFirebirdDeploymentConfig
}) {
  return (
    <div className="select-none overflow-x-auto text-xs">
      <div className="flex flex-row">
        <div className="flex flex-col space-y-2">
          <ConfigKey>Chain ID</ConfigKey>
          <ConfigKey>Kwil version</ConfigKey>
          <ConfigKey>Nodes</ConfigKey>
          <ConfigKey>Cloud Provider</ConfigKey>
          <ConfigKey>Cloud Region</ConfigKey>
          <ConfigKey>Instance Name</ConfigKey>
          <ConfigKey>Instance Type</ConfigKey>
        </div>
        <div className="ml-2 flex flex-col space-y-2">
          <ConfigValue>{config.chain.chain_id}</ConfigValue>
          <ConfigValue>{config.chain.version}</ConfigValue>
          <ConfigValue>{config.node_count}</ConfigValue>
          <ConfigValue>{config.machines.provider}</ConfigValue>
          <ConfigValue>{config.machines.region}</ConfigValue>
          <ConfigValue>{config.machines.instance_name}</ConfigValue>
          <ConfigValue>{config.machines.type}</ConfigValue>
        </div>
      </div>
    </div>
  )
}

const ConfigKey = ({ children }: { children: React.ReactNode }) => (
  <span className="flex justify-center rounded-md border border-slate-100 bg-slate-100/20 px-3 py-1 font-semibold">
    {children}
  </span>
)

const ConfigValue = ({ children }: { children: React.ReactNode }) => (
  <span className="flex justify-start rounded-md border border-white px-3 py-1 text-slate-700">
    {children}
  </span>
)
