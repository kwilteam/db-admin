import CodeBlock from "../../CodeBlock"

const customStyle = {
  background: "#f8fafc", // Tailwind's bg-slate-50
  fontSize: "0.75rem",
  borderRadius: "0.375rem", // Tailwind's rounded-md
  cursor: "pointer",
}

export default function KwilCliConnect({
  providerEndpoint,
  chain,
}: {
  providerEndpoint: string
  chain: { chain_id: string; version: string }
}) {
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
