import { useState } from "react"
import CodeBlock from "../../CodeBlock"

const customStyle = {
  background: "#f8fafc", // Tailwind's bg-slate-50
  fontSize: "0.75rem",
  borderRadius: "0.375rem", // Tailwind's rounded-md
  cursor: "pointer",
}

export default function JsSdkConnect({
  providerEndpoint,
  chain,
}: {
  providerEndpoint: string
  chain: { chain_id: string; version: string }
}) {
  const [environment, setEnvironment] = useState<"web" | "node">("web")

  const nodeCode = `
const { Wallet } = require('ethers');
const kwiljs = require('@kwilteam/kwil-js');

const wallet = new Wallet("MY_PRIVATE_KEY");

const kwil = new kwiljs.NodeKwil({
  kwilProvider: "${providerEndpoint}",
  chainId: "${chain?.chain_id}"
});
  `.trim()

  const webCode = `
import { BrowserProvider } from 'ethers';
import { WebKwil } from '@kwilteam/kwil-js';

// to be used for funding and signing transactions
const provider = new BrowserProvider(window.ethereum)

const kwil = new WebKwil({
    kwilProvider: "${providerEndpoint}",
    chainId: "${chain?.chain_id}"
});
  `.trim()

  return (
    <div>
      <div className="mb-4 flex items-center justify-start">
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-kwil focus:ring-1 focus:ring-slate-200"
              name="environment"
              value="web"
              checked={environment === "web"}
              onChange={() => setEnvironment("web")}
            />
            <span className="ml-2 text-xs">Web</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-kwil focus:ring-1 focus:ring-slate-200"
              name="environment"
              value="node"
              checked={environment === "node"}
              onChange={() => setEnvironment("node")}
            />
            <span className="ml-2 text-xs">Node.js</span>
          </label>
        </div>
      </div>
      <CodeBlock
        language="js"
        code={environment === "web" ? webCode : nodeCode}
        customStyle={customStyle}
      />
    </div>
  )
}
