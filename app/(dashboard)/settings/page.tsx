"use client"

import { redirect } from "next/navigation"

export default function SettingsPage() {
  // This will auto redirect to the accounts page
  redirect("/settings/accounts")
}
