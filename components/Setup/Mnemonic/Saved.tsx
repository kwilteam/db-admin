interface ISavedProps {
  mnemonicSaved: boolean
  setMnemonicSaved: (mnemonicSaved: boolean) => void
}

export default function Saved({
  mnemonicSaved,
  setMnemonicSaved,
}: ISavedProps) {
  return (
    <div className="flex justify-center">
      <div className="flex h-6 items-center">
        <input
          aria-describedby="comments-description"
          name="mnemonicSaved"
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300"
          checked={mnemonicSaved}
          onChange={(e) => setMnemonicSaved(e.target.checked)}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor="mnemonicSaved" className="font-medium text-gray-900">
          I have saved my mnemonic phrase
        </label>
      </div>
    </div>
  )
}
