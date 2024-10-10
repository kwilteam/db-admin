import Loading from "@/components/Loading"
import { ErrorIcon, CheckIcon } from "@/utils/icons"

export default function AccessCodeStatus({
  checkingAccessCode,
  resendingCode,
  codeSuccess,
  codeResent,
  handleResendCode,
}: {
  checkingAccessCode: boolean
  resendingCode: boolean
  codeSuccess: boolean | undefined
  codeResent: boolean | undefined
  handleResendCode: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <div data-testid="access-code-status" className="mt-4 flex flex-col gap-2">
      {!checkingAccessCode &&
        !resendingCode &&
        codeSuccess === undefined &&
        codeResent === undefined && (
          <div className="flex gap-2 text-sm text-gray-500">
            <button
              onClick={handleResendCode}
              className="font-semibold text-kwil/80"
            >
              Resend code
            </button>
          </div>
        )}
      {(checkingAccessCode || resendingCode) && <Loading className="w-4" />}
      {codeSuccess === false && (
        <p className="flex flex-row items-center gap-2 text-sm text-red-500">
          <ErrorIcon className="h-6 w-6" /> This code isn&apos;t valid. Try
          again.
        </p>
      )}
      {codeSuccess === true && (
        <p className="flex flex-row items-center gap-2 text-sm text-kwil-dark">
          <CheckIcon className="h-4 w-4" /> Great! You&apos;re in.
          Redirecting...
        </p>
      )}

      {codeResent === true && (
        <p className="flex flex-row items-center gap-2 text-sm text-kwil-dark">
          <CheckIcon className="h-4 w-4" /> Code sent! Please check your email.
        </p>
      )}
    </div>
  )
}
