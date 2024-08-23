import { Step } from "../Step"
import { DeploymentOptionCard } from "../DeploymentOptionCard"
import { ServicesStepIcon } from "@/utils/icons"
import { IFirebirdServices } from "@/store/firebird"

const services: Array<{
  title: string
  description: string
  optionValue: IFirebirdServices
  talkWithTeam: boolean
}> = [
  {
    title: "KwilD + Postgres",
    description:
      "The Kwil Daemon, responsible for validating blocks and executing transactions, and its underlying Postgres instance.",
    optionValue: {
      daemon: true,
      gateway: false,
      indexer: false,
      customBinary: false,
    },
    talkWithTeam: false,
  },
  {
    title: "Kwil Gateway",

    description: "Authn and load balancing service for Kwil networks.",
    optionValue: {
      daemon: false,
      gateway: true,
      indexer: false,
      customBinary: false,
    },
    talkWithTeam: true,
  },
  {
    title: "Kwil Indexer",
    description: "A blockchain indexer for Kwil networks.",
    optionValue: {
      daemon: false,
      gateway: false,
      indexer: true,
      customBinary: false,
    },
    talkWithTeam: true,
  },
  {
    title: "Custom Binary",
    description: "Upload a compiled Kwild binary with extensions.",
    optionValue: {
      daemon: false,
      gateway: false,
      indexer: false,
      customBinary: true,
    },
    talkWithTeam: true,
  },
]

export function ServicesStep() {
  return (
    <Step
      step={5}
      icon={<ServicesStepIcon />}
      title="Select services"
      description="Select the services you want to deploy."
    >
      <div className="grid grid-cols-2 gap-2">
        {services.map((service) => (
          <DeploymentOptionCard
            key={service.title}
            step={5}
            title={service.title}
            description={service.description}
            optionKey="services"
            optionValue={service.optionValue}
            talkWithTeam={service.talkWithTeam}
          />
        ))}
      </div>
    </Step>
  )
}
