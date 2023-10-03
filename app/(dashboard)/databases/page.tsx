"use client"

import useActivePageName from "@/hooks/useActivePageName"
import { selectDatabaseActiveContext } from "@/store/database"
import { useAppSelector } from "@/store/hooks"
import { redirect } from "next/navigation"

export default function DatabasesPage() {
  // This will auto redirect to the previous active database context e.g. last table or action
  const activePageName = useActivePageName()
  const databaseContext = useAppSelector(selectDatabaseActiveContext)

  if (activePageName === "Databases" && databaseContext) {
    redirect(
      `/databases/${databaseContext.database}/${databaseContext.type}/${databaseContext.name}`,
    )
  }

  return null
}
