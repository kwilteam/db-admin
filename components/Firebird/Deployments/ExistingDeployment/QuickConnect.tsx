import Tabs from "../../Tabs"
import JsSdkConnect from "./JsSdkConnect"
import KwilCliConnect from "./KwilCliConnect"

export default function QuickConnect({
  providerEndpoint,
  chain,
}: {
  providerEndpoint: string
  chain: { chain_id: string; version: string }
}) {
  return (
    <div className="flex flex-col justify-start gap-2">
      <div className="rounded-md border border-slate-100">
        <Tabs
          tabs={[
            {
              name: "Kwil CLI",
              component: (
                <KwilCliConnect
                  providerEndpoint={providerEndpoint}
                  chain={chain}
                />
              ),
            },
            {
              name: "JavaScript",
              component: (
                <JsSdkConnect
                  providerEndpoint={providerEndpoint}
                  chain={chain}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
