import Image from "next/image"

interface Props {
  children: React.ReactNode
}

export default function SigninLayout({ children }: Props) {
  return (
    <>
      <div className="bg-kwil text-center">
        <Image
          src="/images/kwil-white-horizontal.svg"
          alt="Kwil Logo"
          className="mx-auto h-auto p-4"
          width={140}
          height={80}
          priority
        />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </>
  )
}
