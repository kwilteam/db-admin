"use client"
import { useState } from "react"

export default function AccessCodePage() {
  const [code, setCode] = useState(Array(6).fill(""))

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    if (/^\d+$/.test(pastedData)) {
      setCode(pastedData.slice(0, 6).split(""))
    }
  }

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        e.target.value.length > 1 ||
        (!/^\d+$/.test(e.target.value) && e.target.value !== "")
      ) {
        return
      }
      const newCode = [...code]
      newCode[index] = e.target.value
      setCode(newCode)
    }

  return (
    <div>
      <form className="flex space-x-2" onPaste={handlePaste}>
        {code.map((num, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={num}
            onChange={handleChange(i)}
            className="h-12 w-12 rounded border text-center text-lg"
          />
        ))}
      </form>
    </div>
  )
}
