import ExtensionView from "@/components/Extensions/View"
import { IKwilExtension } from "../page"

const extension: IKwilExtension = {
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
}

export default function ExtensionPage() {
  return (
    <div className="flex-1 overflow-scroll">
      <div className="flex min-h-screen flex-col">
        <ExtensionView extension={extension} />
      </div>
    </div>
  )
}
