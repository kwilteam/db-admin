"use client"

import useAccessCode from "@/hooks/useAccessCode"
import Alert from "@/components/Alert"
import Button from "@/components/Button"
import Loading from "@/components/Loading"

export default function AccessCodePage() {
  const {
    code,
    loading,
    error,
    success,
    inputsRef,
    handlePaste,
    handleChange,
    submitAccessCode,
  } = useAccessCode()

  return (
    <div>
      <form
        className="flex flex-col gap-2"
        onPaste={handlePaste}
        onSubmit={(e) => {
          e.preventDefault()
          submitAccessCode()
        }}
      >
        {error && <Alert text={error ?? "Error"} type="error" />}
        {success && <Alert text={success ?? "Success"} type="success" />}
        <div className="flex flex-row space-x-2">
          {code.map((num, i) => (
            <input
              key={i}
              test-id={`access-code-input-${i}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={num}
              onChange={handleChange(i)}
              className="h-12 w-12 rounded border text-center text-lg"
              ref={(el) => (inputsRef.current[i] = el)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          {loading ? (
            <Loading className="flex items-center" />
          ) : (
            <Button context="primary" size="md" disabled={loading}>
              Continue
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
