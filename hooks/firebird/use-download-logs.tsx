import { downloadServiceLogs } from "@/utils/firebird/api"
import { useState } from "react"

export default function useDownloadLogs() {
  const [downloadingLogs, setDownloadingLogs] = useState<Set<string>>(new Set())

  const downloadLogs = async (
    e: React.MouseEvent<HTMLDivElement>,
    serviceId: string,
    serviceName: string,
  ) => {
    e.stopPropagation()
    setDownloadingLogs((prev) => new Set(prev).add(serviceId))
    try {
      const { status, data, message } = await downloadServiceLogs(serviceId)
      if (status === 200 && data) {
        const blob = new Blob([data], { type: "text/plain;charset=utf-8" })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `${serviceName}_logs.txt`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        console.error("Failed to download logs", status, message)
      }
    } catch (error) {
      console.error("Error downloading logs", error)
    }
    setDownloadingLogs((prev) => {
      const newSet = new Set(prev)
      newSet.delete(serviceId)
      return newSet
    })
  }

  return { downloadingLogs, downloadLogs }
}
