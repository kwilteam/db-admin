interface IListWordsProps {
  mnemonic: string
}

export default function WordList({ mnemonic }: IListWordsProps) {
  return (
    <div className="grid grid-cols-4 gap-1">
      {mnemonic.split(" ").map((word, index) => {
        return (
          <div key={index} className="flex flex-col">
            <div className="flex justify-center rounded-md bg-slate-50 p-1">
              {word}
            </div>
          </div>
        )
      })}
    </div>
  )
}
