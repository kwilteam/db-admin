import classNames from "classnames"
import { ModalEnum, setModal } from "@/store/global"
import {
  selectNewDeploymentServices,
  setNewDeploymentServices,
} from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ServicesStepIcon, StepIcon } from "@/utils/icons"
import { Step } from "../Step"
import { IFirebirdServices } from "@/utils/firebird/types"

export function ServicesStep() {
  return (
    <Step
      step={5}
      icon={<StepIcon />}
      title="Select Services"
      description="Select the services you want to deploy."
    >
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.testId} service={service} />
        ))}
      </div>
    </Step>
  )
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const selectedServices = useAppSelector(selectNewDeploymentServices)
  const dispatch = useAppDispatch()
  const isSelected = selectedServices?.[service.optionKey] === true

  const setService = (key: keyof IFirebirdServices, value: boolean) => {
    dispatch(setNewDeploymentServices({ key, value }))

    if (service.enterprise && !isSelected) {
      dispatch(setModal(ModalEnum.TALK_WITH_TEAM))
    }
  }

  const _classNames = classNames(
    "relative flex cursor-pointer select-none flex-col gap-2 rounded-md border p-3",
    {
      "hover:border-sky-700/50 hover:bg-sky-500/5":
        !service.enterprise && !isSelected,
      "border-sky-700/50 bg-sky-500/5": isSelected,
      "border-slate-200 bg-slate-50/70": !isSelected,
      "text-slate-400": service.enterprise,
      "text-slate-700": !service.enterprise,
    },
  )

  return (
    <div
      className={_classNames}
      key={service.title}
      onClick={(e) => {
        const checked = e.currentTarget.querySelector("input")?.checked
        setService(service.optionKey, !checked)
      }}
      data-testid={service.testId}
    >
      {service.enterprise && (
        <div className="absolute right-1 top-1 rounded-md bg-sky-500 px-2 py-1 text-xs text-white">
          Enterprise
        </div>
      )}
      <div className="flex flex-row items-center gap-2">
        <span className="text-lg font-medium">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border p-3 ring-0 checked:bg-kwil checked:hover:bg-kwil focus:ring-1 focus:ring-slate-100 checked:focus:bg-kwil"
            checked={selectedServices?.[service.optionKey] === true}
            onChange={(e) => {
              setService(service.optionKey, e.target.checked)
            }}
          />
        </span>
        {service.title}
        <ServicesStepIcon />
      </div>
      <span className="text-sm">{service.description}</span>
    </div>
  )
}

const services: Array<{
  testId: string
  title: string
  description: string
  optionKey: keyof IFirebirdServices
  enterprise: boolean
}> = [
  {
    testId: "kwild-postgres-option",
    title: "Kwild + PostgreSQL",
    description:
      "The Kwil Daemon, responsible for validating blocks and executing transactions, and its underlying PostgreSQL instance.",
    optionKey: "daemon",
    enterprise: false,
  },
  {
    testId: "kwil-gateway-option",
    title: "Kwil Gateway",
    description: "Authn and load balancing service for Kwil networks.",
    optionKey: "gateway",
    enterprise: true,
  },
  {
    testId: "kwil-indexer-option",
    title: "Kwil Indexer",
    description: "A blockchain indexer for Kwil networks.",
    optionKey: "indexer",
    enterprise: true,
  },
  {
    testId: "custom-binary-option",
    title: "Custom Binary",
    description: "Upload a compiled Kwild binary with extensions.",
    optionKey: "customBinary",
    enterprise: true,
  },
]
