interface IActionStatementsProps {
  statements: readonly string[] | undefined
}

export default function ActionStatements({
  statements,
}: IActionStatementsProps) {
  return (
    <div className="flex-1">
      <h2 className="text-md py-2 text-slate-900 underline">Action Body</h2>
      <div className="flex flex-col gap-2">
        {statements && (
          <code className="flex flex-col gap-2 rounded-md p-2 text-sm">
            {statements.map((statement) => {
              return (
                <span key={statement}>
                  {statement}
                  <br />
                </span>
              )
            })}
          </code>
        )}
      </div>
    </div>
  )
}
