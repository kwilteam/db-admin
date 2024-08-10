import Image from "next/image"

export default function DeploymentsAuthLayout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <div className="flex max-h-mobile min-h-mobile flex-col bg-white lg:min-h-screen">
      <div className="flex-1 overflow-scroll bg-slate-50">
        <div className="flex flex-row items-center justify-center">
          <div className="hidden h-screen w-1/2 items-center justify-center text-left lg:flex">
            <div className="flex flex-col">
              <div className="flex flex-row gap-4">
                <Image
                  className=""
                  src="/images/kwil.png"
                  alt="Kwil"
                  width={60}
                  height={60}
                />
                <div className="pt-2 text-2xl font-bold text-kwil">
                  Kwil Firebird
                </div>
              </div>
              <div className="m-3 flex flex-col gap-2">
                <div className="text-xl text-gray-500">
                  Firebird is Kwil&apos;s deployment as a service platform.
                </div>
                <div className="text-xl text-gray-500">
                  It is a platform that allows you to deploy
                </div>
                <div className="text-xl text-gray-500">
                  Kwil services to the cloud with ease.
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-screen flex-grow items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
