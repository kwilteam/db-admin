import { DatabaseTables } from "./DatabaseTables"
import { DatabaseActions } from "./DatabaseActions"
import { useAppSelector } from "@/store/hooks"
import { selectDatabaseVisibility } from "@/store/database"

export const DatabaseSchema = ({ database }: { database: string }) => {
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  return (
    // databaseSchemas[database] &&
    databaseVisibility[database]?.isVisible && (
      <div key={`${database}-schema`} className="ml-7 flex flex-1 flex-col">
        <DatabaseTables database={database} />
        <DatabaseActions database={database} />
      </div>
    )
  )
}
