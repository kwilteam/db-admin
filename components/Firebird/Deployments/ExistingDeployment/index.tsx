import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectActiveDeployment, setActiveDeployment } from "@/store/firebird"
import { getDeployment } from "@/utils/firebird/api"
import Loading from "@/components/Loading"
import SelectedDeploymentCard from "./SelectedDeploymentCard"
import CodeBlock from "../../CodeBlock"
import Tabs from "../../Tabs"

const customStyle = {
  background: "#f8fafc", // Tailwind's bg-slate-50
  fontSize: "0.75rem",
  borderRadius: "0.375rem", // Tailwind's rounded-md
  cursor: "pointer",
}

export default function ExistingDeployment({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const activeDeployment = useAppSelector(selectActiveDeployment)

  const chain = activeDeployment?.config.chain
  const providerEndpoint = activeDeployment?.endpoints.chain

  useEffect(() => {
    const loadAsync = async () => {
      const { status, data } = await getDeployment(id)

      if (status === 200 && data) {
        dispatch(setActiveDeployment(data))
      }
    }

    loadAsync()

    return () => {
      dispatch(setActiveDeployment(undefined))
    }
  }, [id, dispatch])

  console.log(activeDeployment, "activeDeployment")

  if (!activeDeployment) {
    return (
      <div className="flex w-full justify-center pt-4">
        <Loading />
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-row gap-8">
      <div className="flex h-24 w-full flex-col items-start gap-8 lg:w-1/2">
        <SelectedDeploymentCard deployment={activeDeployment} />

        <Tabs
          tabs={[
            { name: "Nodes", component: <div>Nodes</div> },
            {
              name: "Configuration",
              component: <div>Configuration</div>,
            },
          ]}
        />
      </div>
      <div className="mt-4 flex flex-col justify-start gap-2 lg:w-1/2">
        {providerEndpoint && chain && (
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
        )}
      </div>
    </div>
  )
}

const KwilCliConnect = ({
  providerEndpoint,
  chain,
}: {
  providerEndpoint: string
  chain: { chain_id: string; version: string }
}) => {
  const cliPingCode = `kwil-cli utils ping --provider=${providerEndpoint}`
  const cliConnectCode = `kwil-cli --provider=${providerEndpoint} --private-key=your_private_key --chain-id=${chain?.chain_id}`

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm">
        Ping the provider and confirm it&apos;s working.
      </p>
      <CodeBlock code={cliPingCode} customStyle={customStyle} />

      <div></div>

      <p className="text-sm">Connect to the provider with your private key.</p>
      <CodeBlock code={cliConnectCode} customStyle={customStyle} />
    </div>
  )
}

const JsSdkConnect = ({
  providerEndpoint,
  chain,
}: {
  providerEndpoint: string
  chain: { chain_id: string; version: string }
}) => {
  const jsCode = `
const { Wallet } = require('ethers');
const kwiljs = require('@kwilteam/kwil-js');
  
const wallet = new Wallet("MY_PRIVATE_KEY");

const kwil = new kwiljs.NodeKwil({
  kwilProvider: "${providerEndpoint}",
  chainId: "${chain?.chain_id}"
});

await kwil.ping();
    `.trim()

  return <CodeBlock language="js" code={jsCode} customStyle={customStyle} />
}
