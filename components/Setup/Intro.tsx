import Link from "next/link"
import Button from "../Button"

export default function Intro() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex text-lg">Web3 Native Decentralized Databases</div>
      <div className="flex">
        <Link href="/setup?continue=true">
          <Button context="primary" size="md">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}
