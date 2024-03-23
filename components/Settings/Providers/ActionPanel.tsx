export default function ActionPanel({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex w-full gap-2 border-t border-slate-200 bg-slate-50/50 bg-white p-3 text-center text-sm">
      {children}
    </div>
  )
}
