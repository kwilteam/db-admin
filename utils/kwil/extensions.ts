import { IExtensionFilter, IKwilExtension } from "@/store/extensions"

export const getExtensions = async (
  filters: IExtensionFilter,
): Promise<IKwilExtension[]> => {
  return [
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
}

export const getExtension = async (id: number): Promise<IKwilExtension> => {
  const extensions = await getExtensions({
    search: "",
    official: "false",
    verified: "false",
  })

  return extensions.find((e) => e.id === Number(id)) as IKwilExtension
}
