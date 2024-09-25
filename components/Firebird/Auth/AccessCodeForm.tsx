export default function AccessCodeForm({
  code,
  handleChange,
  inputRefs,
}: {
  code: string[]
  handleChange: (value: string, index: number) => void
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
}) {
  return (
    <div
      data-testid="access-code-form"
      className="mt-2 flex justify-center space-x-2"
    >
      {code.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          autoComplete="off"
          className="h-12 w-full rounded border border-none py-1.5 text-center text-sm shadow-sm ring-1 ring-slate-300 focus:border-kwil focus:outline-none focus:ring-2 focus:ring-kwil lg:h-14"
          onChange={(e) => handleChange(e.target.value, index)}
          ref={(el) => {
            if (el !== null) {
              inputRefs.current[index] = el
              if (index === 0 && code[index] === "") el.focus()
            }
          }}
        />
      ))}
    </div>
  )
}
