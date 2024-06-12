interface IActionStatementsProps {
  statements: readonly string[] | undefined
  methodType: string
}

export default function MethodStatements({
  statements,
  methodType
}: IActionStatementsProps) {
  return (
    <div className="flex-1">
      <h2 className="text-md py-2 text-slate-900 underline">{methodType.charAt(0).toUpperCase() + methodType.slice(1)} Body</h2>
      <div className="flex flex-col gap-2">
        {statements && (
          <code className="flex flex-col gap-2 rounded-md bg-white p-2 text-xs">
            {statements.map((statement, index) => {
              return (
                <span key={index}>
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
