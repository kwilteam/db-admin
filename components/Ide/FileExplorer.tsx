import { FileIcon } from "@/utils/icons"
import classNames from "classnames"
import React, { useState } from "react"

interface IFileExplorerProps {
  templates: string[]
  savedFiles: string[]
}

export default function FileExplorer({
  templates,
  savedFiles,
}: IFileExplorerProps) {
  const [activeTab, setActiveTab] = useState<"template" | "saved">("saved")

  const loadFile = (file: string, type: "template" | "saved") => {
    console.log(file, type)
  }

  return (
    <div className="w-full bg-white p-2">
      <div className="flex">
        <button
          className={classNames({
            "text-md flex-1 rounded-md p-1 text-sm": true,

            "bg-kwil text-slate-100": activeTab === "saved",
          })}
          onClick={() => setActiveTab("saved")}
        >
          Saved
        </button>
        <button
          className={classNames({
            "text-md flex-1 rounded-md text-sm": true,
            "bg-kwil text-slate-100": activeTab === "template",
          })}
          onClick={() => setActiveTab("template")}
        >
          Templates
        </button>
      </div>
      <div className="mt-2">
        <ul className="list-none">
          {(activeTab === "template" ? templates : savedFiles).map((file) => (
            <li
              key={file}
              className="m-1 flex cursor-pointer items-center rounded-md p-1 text-sm hover:bg-slate-50"
              onClick={() => loadFile(file, activeTab)}
            >
              <FileIcon className="mr-1 h-4 w-4" />
              {file}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
