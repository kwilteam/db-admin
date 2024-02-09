import Header from "@/components/Settings/Providers/Header"

export default async function GeneralPage() {
  return (
    <div className="flex max-h-mobile min-h-mobile flex-col lg:min-h-screen">
      <Header />

      <div className="flex-1 overflow-scroll bg-slate-50 p-2">
        <div className="flex flex-col gap-2 border border-slate-200 bg-white p-2 text-sm">
          Table of Providers
        </div>
      </div>
    </div>
  )
}
