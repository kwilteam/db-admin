import ExtensionCard from "@/components/Extensions/ExtensionCard"

const extensions = [
  {
    name: "Leslie Alexander",
    publisher: "Co-Founder / CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
  },
  {
    name: "Leslie Alexander1",
    publisher: "Co-Founder / CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
  },
  {
    name: "Leslie Alexande2r",
    publisher: "Co-Founder / CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
  },
  {
    name: "Leslie Alexander3",
    publisher: "Co-Founder / CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
  },
  {
    name: "Leslie Alexander4",
    publisher: "Co-Founder / CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
  },
  {
    name: "Leslie Alexander4",
    publisher: "Co-Founder / CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
  },
  {
    name: "Leslie Alexander4",
    publisher: "Co-Founder / CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
  },
  {
    name: "Leslie Alexander4",
    publisher: "Co-Founder / CEO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus temporibus quia, quibusdam molestiae voluptatum atque alias.",
  },
]

export default function ExtensionsPage() {
  return (
    <div className="flex min-h-screen flex-col p-3">
      <input
        className="flex w-[800px] items-start rounded-md border border-slate-100 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-kwil"
        type="text"
        placeholder="Search Extensions"
      />
      <div className="mt-3 grid w-full grid-flow-row grid-cols-1 place-items-start gap-2 lg:grid-cols-2">
        {extensions.map((extension) => (
          <ExtensionCard key={extension.name} extension={extension} />
        ))}
      </div>
    </div>
  )
}
