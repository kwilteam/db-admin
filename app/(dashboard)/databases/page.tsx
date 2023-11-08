"use client"

import useActivePage from "@/hooks/useActivePage"
import { selectDatabaseActiveContext } from "@/store/database"
import { useAppSelector } from "@/store/hooks"
import { redirect } from "next/navigation"

export default function DatabasesPage() {
  // This will auto redirect to the previous active database context e.g. last table or action
  const activePage = useActivePage()
  const databaseContext = useAppSelector(selectDatabaseActiveContext)

  if (activePage?.name === "Databases" && databaseContext) {
    redirect(
      `/databases/${databaseContext.database}/${databaseContext.type}/${databaseContext.name}`,
    )
  }

  return null
}
