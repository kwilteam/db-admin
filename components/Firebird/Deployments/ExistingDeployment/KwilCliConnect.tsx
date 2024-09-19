import { LinkIcon } from "@/utils/icons"
import CodeBlock from "../../CodeBlock"

const customStyle = {
  background: "#f8fafc", // Tailwind's bg-slate-50
  fontSize: "0.75rem",
  borderRadius: "0.375rem", // Tailwind's rounded-md
  cursor: "pointer",
}

const docsUrl = process.env.NEXT_PUBLIC_KWIL_CLI_DOCS_URL
const downloadUrl = process.env.NEXT_PUBLIC_KWIL_CLI_DOWNLOAD_URL

export default function KwilCliConnect({
  providerEndpoint,
  chain,
}: {
  providerEndpoint: string
  chain: { chain_id: string; version: string }
}) {
  const verifyInstallCode = `kwil-cli version`
  const cliPingCode = `kwil-cli utils ping --provider=${providerEndpoint}`
  const cliConnectCode = `kwil-cli --provider=${providerEndpoint} --private-key=your_private_key --chain-id=${chain?.chain_id}`

  return (
    <div className="flex flex-col gap-2">
      <a
        href={docsUrl}
        target="_blank"
        className="flex items-center text-sm text-kwil hover:underline"
      >
        <LinkIcon className="mr-1 h-4 w-4" />
        Docs
      </a>

      <p className="text-md flex flex-row gap-1 font-medium">
        1. Install the Kwil CLI
      </p>

      <p className="flex flex-row gap-1 text-sm">
        <a
          href={downloadUrl}
          target="_blank"
          className="ml-1 flex items-center text-sm text-kwil hover:underline"
        >
          Download
        </a>
        the latest release of the Kwil CLI.
      </p>
      <CodeBlock
        language="bash"
        code={verifyInstallCode}
        customStyle={customStyle}
      />

      <p className="text-md mt-2 flex flex-row gap-1 font-medium">
        2. Connect to the provider
      </p>

      <p className="text-sm">Ping the provider and confirm it&apos;s online.</p>
      <CodeBlock language="bash" code={cliPingCode} customStyle={customStyle} />

      <p className="text-sm">Connect to the provider with your private key.</p>
      <CodeBlock
        language="bash"
        code={cliConnectCode}
        customStyle={customStyle}
      />
    </div>
  )
}
