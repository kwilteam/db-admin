"use client"

import useActivePage from "@/hooks/use-active-page"
import { selectDatabaseActiveContext } from "@/store/database"
import { useAppSelector } from "@/store/hooks"
import { ItemType } from "@/utils/database-types"
import { redirect } from "next/navigation"

export default function DatabasesPage() {
  // This will auto redirect to the previous active database context e.g. last table or action
  const activePage = useActivePage()
  const databaseContext = useAppSelector(selectDatabaseActiveContext)

  if (activePage?.name === "Databases" && databaseContext) {
    redirect(
      `/databases/${databaseContext.dbid}/${databaseContext.type === ItemType.PROCEDURE || databaseContext.type === ItemType.ACTION ? `method/` : ``}${databaseContext.type}/${databaseContext.name}`,
    )
  }

  return null
}
