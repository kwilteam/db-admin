import { ClipboardCheckIcon, ClipboardIcon } from "@/utils/icons"
import React, { useState } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeBlockProps {
  code: string
  language?: string
  customStyle?: React.CSSProperties
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "",
  customStyle,
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative">
      <SyntaxHighlighter
        language={language}
        style={prism}
        customStyle={customStyle}
        wrapLines={true}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
      <button
        onClick={copyToClipboard}
        className="absolute right-1 top-2 rounded bg-slate-100 p-1 text-xs text-slate-600 opacity-0 transition-opacity duration-300 hover:bg-slate-200 hover:text-slate-800 group-hover:opacity-100"
      >
        {copied ? (
          <ClipboardCheckIcon className="h-4 w-4" />
        ) : (
          <ClipboardIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}

export default CodeBlock
