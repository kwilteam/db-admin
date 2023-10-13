import ExtensionsFilters from "@/components/Extensions/Filters"
import ExtensionsCard from "@/components/Extensions/Card"

export interface IKwilExtension {
  id: number
  name: string
  publisher: string
  official: boolean
  verifiedPublisher: boolean
  image: string
  description: string
  readme: string
  gitUrl?: string
  dockerUrl?: string
}

const extensions: IKwilExtension[] = [
  {
    id: 1,
    name: "Database Helper",
    publisher: "Company 1",
    official: true,
    verifiedPublisher: false,
    image: "/images/kwil.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
    readme: "This is a readme",
    gitUrl: "https://github.com/kwilteam/kwil-js",
    dockerUrl: "https://hub.docker.com/r/kwildb/kwil",
  },
  {
    id: 2,
    name: "ERC20 Extension",
    publisher: "Company 2",
    official: false,
    verifiedPublisher: true,
    image: "/images/kwil.png",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
    readme: "This is a readme",
    gitUrl: "https://github.com/kwilteam/kwil-js",
    dockerUrl: "https://hub.docker.com/r/kwildb/kwil",
  },
  {
    id: 3,
    name: "ID Helper",
    publisher: "Company 3",
    official: true,
    verifiedPublisher: false,
    image: "/images/kwil.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
    readme: "This is a readme",
    gitUrl: "https://github.com/kwilteam/kwil-js",
    dockerUrl: "https://hub.docker.com/r/kwildb/kwil",
  },
  {
    id: 4,
    name: "Data Sync Extension",
    publisher: "Company 4",
    official: false,
    verifiedPublisher: true,
    image: "/images/kwil.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
    readme: "This is a readme",
    gitUrl: "https://github.com/kwilteam/kwil-js",
    dockerUrl: "https://hub.docker.com/r/kwildb/kwil",
  },
  {
    id: 5,
    name: "API Integration Extension",
    publisher: "Company 5",
    official: true,
    verifiedPublisher: true,
    image: "/images/kwil.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
    readme: "This is a readme",
    gitUrl: "https://github.com/kwilteam/kwil-js",
    dockerUrl: "https://hub.docker.com/r/kwildb/kwil",
  },
]

export default function ExtensionsPage() {
  return (
    <div className="flex flex-row overflow-hidden">
      <div className="hidden border-r border-slate-100 lg:flex lg:w-72">
        <ExtensionsFilters />
      </div>
      <div className="flex-1 overflow-scroll">
        <div className="flex min-h-screen flex-col p-3">
          <input
            className="flex w-full items-start rounded-md border border-slate-100 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-kwil lg:w-1/2"
            type="text"
            placeholder="Search Extensions"
          />
          <div className="mt-3 grid w-full grid-flow-row grid-cols-1 place-items-start gap-2 lg:grid-cols-2">
            {extensions.map((extension) => (
              <ExtensionsCard key={extension.name} extension={extension} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
