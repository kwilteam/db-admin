import { useState } from "react"
import CodeBlock from "../../CodeBlock"
import useCodeSnippets from "@/hooks/firebird/use-code-snippets"
import { LinkIcon } from "@/utils/icons"
import useJsSetupInfo from "@/hooks/firebird/use-js-setup-info"

const codeBlockCustomStyle = {
  background: "#f8fafc", // Tailwind's bg-slate-50
  fontSize: "0.75rem",
  borderRadius: "0.375rem", // Tailwind's rounded-md
  cursor: "pointer",
}

const docsUrl = process.env.NEXT_PUBLIC_KWIL_JS_SDK_DOCS_URL

export default function JsSdkConnect({
  providerEndpoint,
  chain,
}: {
  providerEndpoint: string
  chain: { chain_id: string; version: string }
}) {
  const [environment, setEnvironment] = useState<"web" | "node">("web")
  const { nodeSetup, webSetup, ping, createTable, insert } = useCodeSnippets(providerEndpoint, chain?.chain_id)
  const { nodeInfo, webInfo } = useJsSetupInfo();
  const installCode = "npm install @kwilteam/kwil-js"

  if (!docsUrl) {
    console.error("NEXT_PUBLIC_KWIL_JS_SDK_DOCS_URL is not set")
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="flex flex-row gap-1 text-sm">
        <a
          href={docsUrl}
          target="_blank"
          className="flex items-center text-sm text-kwil hover:underline"
        >
          <LinkIcon className="mr-1 h-4 w-4" />
          Docs
        </a>
      </p>

      <p className="text-md flex flex-row gap-1 font-medium">
        1. Install the Kwil JS SDK
      </p>

      <CodeBlock
        language="bash"
        code={installCode}
        customStyle={codeBlockCustomStyle}
      />

      <p className="text-md flex flex-row gap-1 font-medium">
        2. Setup Kwil Class
      </p>

      <div className="flex items-center justify-start">
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
      <p className="text-sm">
        {environment === "web" ? webInfo : nodeInfo}
      </p>
      <CodeBlock
        language="js"
        code={environment === "web" ? webSetup : nodeSetup}
        customStyle={codeBlockCustomStyle}
      />
      <p className="text-sm">
        Confirm node is online:
      </p>
      <CodeBlock
        language="js"
        code={ping}
        customStyle={codeBlockCustomStyle}
      />
      
      <p className="text-md flex flex-row gap-1 font-medium">
        3. Create table and insert data
      </p>
      <CodeBlock
        language="js"
        code={createTable}
        customStyle={codeBlockCustomStyle}
        />
      <CodeBlock
        language="js"
        code={insert}
        customStyle={codeBlockCustomStyle}
      />
    </div>
  )
}
