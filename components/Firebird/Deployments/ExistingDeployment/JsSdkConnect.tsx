import { useState } from "react"
import CodeBlock from "../../CodeBlock"
import useCodeSnippets from "@/hooks/firebird/use-code-snippets"

const codeBlockCustomStyle = {
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
  const { node, web } = useCodeSnippets(providerEndpoint, chain?.chain_id)

  return (
    <div>
      <div className="mb-4 flex items-center justify-start">
        <div className="ml-2 mt-1 flex items-center space-x-4">
          <label className="inline-flex cursor-pointer items-center">
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
          <label className="inline-flex cursor-pointer items-center">
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
        code={environment === "web" ? web : node}
        customStyle={codeBlockCustomStyle}
      />
    </div>
  )
}
