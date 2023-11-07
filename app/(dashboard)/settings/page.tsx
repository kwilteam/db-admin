"use client"

import { redirect } from "next/navigation"

export default function SettingsPage() {
  // This will auto redirect to the general page
  redirect("/settings/general")
}
