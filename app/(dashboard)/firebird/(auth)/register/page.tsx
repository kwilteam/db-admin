import Link from "next/link"
import { RegisterIcon } from "@/utils/icons"
import AuthForm from "@/components/Firebird/Auth/AuthForm"

export default function DeploymentsLoginPage() {
  return (
    <AuthForm
      title="Create your account"
      icon={<RegisterIcon className="h-5 w-5 text-gray-900 lg:h-6 lg:w-6" />}
    >
      Already have an account?
      <Link href="/firebird/login" className="font-semibold text-kwil/80">
        Log in
      </Link>
    </AuthForm>
  )
}
