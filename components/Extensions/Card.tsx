import Image from "next/image"
import OfficialBadge from "../Badge/Official"
import VerifiedBadge from "../Badge/Verified"
import PublisherBadge from "../Badge/Publisher"
import { IKwilExtension } from "@/app/(dashboard)/extensions/page"
import Link from "next/link"
import { DockerIcon, GitIcon } from "@/utils/icons"

interface IExtensionCardProps {
  extension: IKwilExtension
}

export default function ExtensionCard({ extension }: IExtensionCardProps) {
  return (
    <Link href={`/extensions/${extension.id}`}>
      <div className="flex h-40 w-full cursor-pointer flex-row gap-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:bg-slate-50/30">
        <div className="flex flex-col justify-center text-center">
          <Image
            className="h-16 w-16 rounded-lg p-1"
            src={extension.image}
            alt={extension.name}
            width={60}
            height={60}
          />
        </div>
        <div className="my-1 flex flex-1 flex-col gap-2 overflow-hidden text-sm text-gray-500">
          <div className="font-medium text-gray-900">{extension.name}</div>
          <div className="text-wrap flex-1 overflow-hidden">
            {extension.description}
          </div>
          <div className="flex flex-row gap-4">
            <PublisherBadge publisher={extension.publisher} />
            {extension.official && <OfficialBadge />}
            {extension.verifiedPublisher && <VerifiedBadge />}
          </div>
          <div className="flex flex-row gap-4">
            {extension.gitUrl && (
              <Link href={extension.gitUrl}>
                <GitIcon className="h-5 w-5 hover:text-slate-900" />
              </Link>
            )}

            {extension.dockerUrl && (
              <Link href={extension.dockerUrl}>
                <DockerIcon className="h-5 w-5 hover:text-slate-900" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
