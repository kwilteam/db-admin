import Link from "next/link"
import { LoginIcon } from "@/utils/icons"
import AuthForm from "@/components/Firebird/Auth/AuthForm"

export default function DeploymentsLoginPage() {
  return (
    <AuthForm
      title="Log in to your account"
      icon={<LoginIcon className="h-5 w-5 text-gray-900 lg:h-6 lg:w-6" />}
    >
      Don&apos;t have an account?
      <Link href="/firebird/register" className="font-semibold text-kwil/80">
        Register
      </Link>
    </AuthForm>
  )
}
