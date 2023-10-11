import Image from "next/image"

interface IExtensionCardProps {
  extension: any
}

export default function ExtensionCard({ extension }: IExtensionCardProps) {
  return (
    <div
      key={extension.name}
      className="flex h-36 max-w-[800px] cursor-pointer items-center space-x-3 rounded-lg border border-slate-200 bg-white px-6 py-5 shadow-sm hover:bg-slate-50"
    >
      <Image
        className="h-10 w-10 rounded-full"
        src={extension.image}
        alt=""
        width={40}
        height={40}
      />
      <div className="overflow-hidden">
        <p className="text-sm font-medium text-gray-900">{extension.name}</p>
        <p className="truncate text-sm text-gray-500">
          {extension.description}
        </p>
      </div>
    </div>
  )
}
