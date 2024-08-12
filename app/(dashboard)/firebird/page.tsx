"use client"

import { redirect } from "next/navigation"

// TODO: Get deployments, signed in status
const signedIn = false

export default function FirebirdPage() {
  // This will auto redirect to the main deployments page
  if (!signedIn) {
    redirect("/firebird/register")
  } else {
    redirect("/firebird/deployments")
  }
}
