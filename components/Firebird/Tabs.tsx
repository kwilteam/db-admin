import classNames from "classnames"
import { useState } from "react"

export default function Tabs({
  tabs,
}: {
  tabs: { name: string; component: React.ReactNode }[]
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].name)

  return (
    <div className="m-1 flex w-full flex-col gap-2">
      <nav aria-label="Tabs" className="inline-flex gap-2 rounded-md p-1">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            className={classNames(
              "font-sm cursor-pointer select-none rounded-md px-3 py-2 text-xs",
              {
                "bg-kwil text-white": tab.name === activeTab,
                "bg-slate-100 hover:bg-slate-200": tab.name !== activeTab,
              },
            )}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </a>
        ))}
      </nav>
      <div className="mb-1 px-1">
        {tabs.find((tab) => tab.name === activeTab)?.component}
      </div>
    </div>
  )
}
