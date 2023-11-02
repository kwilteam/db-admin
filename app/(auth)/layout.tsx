import Image from "next/image"

interface IProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: IProps) {
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center bg-slate-50 p-3">
      <div className="flex min-h-full w-full flex-col rounded-md text-center md:w-1/2 lg:w-1/3">
        <div className="flex-1 rounded-t-md bg-kwil">
          <Image
            src="/images/kwil-white-horizontal.svg"
            alt="Kwil Logo"
            className="mx-auto h-auto  p-4"
            width={200}
            height={120}
            priority
          />
        </div>

        <div className="flex min-h-full flex-1 flex-col rounded-b-md border border-slate-200 bg-white p-3">
          <div className="flex justify-center">{children}</div>
        </div>
      </div>
    </div>
  )
}
