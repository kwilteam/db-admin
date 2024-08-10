"use client"

import Link from "next/link"
import Button from "@/components/Button"
import { DeployIcon, FirebirdIcon } from "@/utils/icons"

// TODO: Fetch deployments
const deployments: any = []

export default function DeploymentsHomePage() {
  return (
    <>
      <div className="flex-1 overflow-scroll bg-slate-50">
        {/* If no deployments, show a message */}
        {deployments.length === 0 && (
          <div className="flex h-screen flex-col items-center justify-center gap-4">
            <FirebirdIcon className="h-16 w-16 text-kwil" />
            <h1 className="text-2xl tracking-tight text-gray-900">
              Deploy your first Kwil network!
            </h1>
            <p className="text-gray-500">
              Firebird makes it easy to deploy and <br />
              manage Kwil networks in the cloud.
            </p>
            <Link href="/firebird/deployment/new">
              <Button context="primary" size="lg">
                <DeployIcon className="mr-2" /> Get Started
              </Button>
            </Link>
          </div>
        )}

        {/* If deployments, show grid of deployments */}
        <div className="grid grid-cols-3 gap-4">
          {deployments.map((deployment: any) => (
            // <DeploymentCard key={deployment.id} deployment={deployment} />
            <div key={deployment.id}>
              <h1>{deployment.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
