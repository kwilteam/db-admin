import Image from "next/image"
import { useAppDispatch } from "@/store/hooks"
import { DeploymentStatus, IFirebirdDeployment } from "@/utils/firebird/types"
import { ChainIcon, DeleteIcon, ProviderIcon } from "@/utils/icons"
import { capitalize, formatTimestamp } from "@/utils/helpers"
import { DeploymentBadge } from "../DeploymentBadge"
import { ModalEnum, setModal } from "@/store/global"
import { setDeleteDeploymentId } from "@/store/firebird"
import { useConnectToProvider } from "@/hooks/firebird/use-connect-to-provider"

// Have to include here as Tailwind struggles to import from the types file
export const statusColor = {
  [DeploymentStatus.PENDING]: "bg-blue-500/80",
  [DeploymentStatus.DEPLOYING]: "bg-yellow-500/80",
  [DeploymentStatus.ACTIVE]: "bg-emerald-500/80",
  [DeploymentStatus.FAILED]: "bg-red-500/80",
  [DeploymentStatus.STOPPED]: "bg-red-600/80",
  [DeploymentStatus.TERMINATED]: "bg-red-600/80",
}

export default function SelectedDeploymentCard({
  deployment,
}: {
  deployment: IFirebirdDeployment
}) {
  console.log(deployment, "Deployment")
  const dispatch = useAppDispatch()
  const { connectToProvider } = useConnectToProvider({
    providerEndpoint: deployment.service_endpoints?.kwil_rpc_provider || "",
    instanceName: deployment.config.machines.instance_name || "",
    chainId: deployment.config.chain.chain_id || "",
  })

  const chain = deployment.config.chain
  const machines = deployment.config.machines
  const status = deployment.status

  const statusColorClass = statusColor[status] || "bg-slate-100"

  const triggerDeleteDeploymentModal = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    console.log("delete deployment", deployment)
    dispatch(setModal(ModalEnum.DELETE_DEPLOYMENT))
    dispatch(setDeleteDeploymentId(deployment.id))
  }

  return (
    <div className="relative flex w-full flex-col gap-3 rounded-md border border-slate-100 p-3">
      <div className="flex w-full items-center justify-start gap-8 px-4 py-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-md border border-slate-100 bg-white p-2">
          <Image
            src="/images/kwil.png"
            alt={machines.instance_name}
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-lg font-medium">{machines.instance_name}</h1>
          </div>
          <div className="text-xs text-slate-500">
            {formatTimestamp(deployment.created_at)}
          </div>
        </div>

        <div className="flex flex-row items-center justify-start gap-2 text-xs text-slate-500">
          <DeploymentBadge className="p-4">
            <div
              className={`h-2 w-2 rounded-full border border-slate-100 ${statusColorClass}`}
            />
            <span>{capitalize(status)}</span>
          </DeploymentBadge>

          <DeploymentBadge className="p-4">
            <Image
              src="/images/kwil.png"
              className="h-4 w-4"
              alt={machines.instance_name}
              width={16}
              height={16}
            />

            <span>{chain.version}</span>
          </DeploymentBadge>

          <DeploymentBadge className="p-4">
            <ChainIcon className="h-4 w-4" />
            <span className="whitespace-nowrap">{chain.chain_id}</span>
          </DeploymentBadge>

          {deployment.status === DeploymentStatus.ACTIVE && (
            <button
              className="flex cursor-pointer flex-row items-center gap-2 rounded-md border border-slate-100 bg-kwil p-4 text-slate-50"
              onClick={connectToProvider}
            >
              <ProviderIcon className="h-4 w-4" />
              <span className="whitespace-nowrap">Connect to Provider</span>
            </button>
          )}
        </div>
      </div>
      {deployment.status === DeploymentStatus.ACTIVE && (
        <button
          className="absolute right-3 top-3 flex cursor-pointer rounded-lg border border-slate-100 p-1 text-slate-600 hover:border-slate-300 hover:text-slate-900"
          onClick={triggerDeleteDeploymentModal}
        >
          <DeleteIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
