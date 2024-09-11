import { ErrorIcon, CheckIcon } from "@/utils/icons"

export default function AccessCodeStatus({
  checkingAccessCode,
  codeSuccess,
  codeResent,
  handleResendCode,
}: {
  checkingAccessCode: boolean
  codeSuccess: boolean | undefined
  codeResent: boolean | undefined
  handleResendCode: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <>
      {!checkingAccessCode &&
        codeSuccess === undefined &&
        codeResent === undefined && (
          <div className="mt-4 flex gap-2 text-sm text-gray-500">
            <button
              onClick={handleResendCode}
              className="font-semibold text-kwil/80"
            >
              Resend code
            </button>
          </div>
        )}
      {checkingAccessCode && (
        <p className="text-sm text-kwil/80">Checking access code...</p>
      )}
      {codeSuccess === false && (
        <p className="flex flex-row items-center gap-2 text-sm text-red-500">
          <ErrorIcon className="h-6 w-6" /> The code wasn&apos;t valid. Try
          again!
        </p>
      )}
      {codeSuccess === true && (
        <p className="flex flex-row items-center gap-2 text-sm text-kwil-dark">
          <CheckIcon className="h-4 w-4" /> Great! You&apos;re in.
          Redirecting...
        </p>
      )}
      {codeResent === false && (
        <p className="flex flex-row items-center gap-2 text-sm text-red-500">
          <ErrorIcon className="h-6 w-6" /> There was a problem sending the
          code. Please try again!
        </p>
      )}
      {codeResent === true && (
        <p className="flex flex-row items-center gap-2 text-sm text-kwil-dark">
          <CheckIcon className="h-4 w-4" /> Code sent! Please check your email.
        </p>
      )}
    </>
  )
}
