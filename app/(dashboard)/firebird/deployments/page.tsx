"use client"

import Link from "next/link"
import { DeployIcon, FirebirdIcon } from "@/utils/icons"

// TODO: Fetch deployments
const deployments: any = []

export default function DeploymentsHomePage() {
  return (
    <>
      <div className="flex-1 overflow-scroll bg-white">
        {/* If no deployments, show a message */}
        {deployments.length === 0 && (
          <div className="flex h-screen flex-col items-center justify-center gap-4">
            <FirebirdIcon className="h-12 w-12 text-gray-600" />
            <h1 className="text-lg tracking-tight text-gray-900 lg:text-xl">
              Deploy your first Kwil network!
            </h1>
            <p className="text-sm text-gray-500">
              Firebird makes it easy to deploy and <br />
              manage Kwil networks in the cloud.
            </p>
            <Link href="/firebird/deployments/new">
              <button className="flex flex-row items-center rounded-md bg-kwil/90 px-4 py-2 text-sm font-medium text-white hover:bg-kwil/80">
                <DeployIcon className="mr-2 h-5 w-5" /> Get Started
              </button>
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
