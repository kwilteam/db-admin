import { useEffect } from "react"
import Button from "@/components/Button"

interface QueryEditorProps {
  sql: string
  setSql: (sql: string) => void
  runQuery: (sql: string) => void
  triggerSaveQueryModal: () => void
}

export default function QueryEditor({
  sql,
  setSql,
  runQuery,
  triggerSaveQueryModal,
}: QueryEditorProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        runQuery(sql)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [sql, runQuery])

  return (
    <div className="flex h-40 flex-col gap-2 overflow-scroll bg-slate-50 p-2">
      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        className="h-36 w-full flex-1 resize-none border border-slate-100 p-2 text-sm focus:border-kwil/70 focus:outline-none focus:ring-0"
        placeholder="Enter SQL query"
      />
      <div className="flex flex-row gap-2">
        <Button onClick={triggerSaveQueryModal} context="secondary">
          Save
        </Button>

        <Button onClick={() => runQuery(sql)} context="primary">
          Execute
        </Button>
      </div>
    </div>
  )
}
