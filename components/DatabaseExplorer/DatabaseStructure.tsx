import DatabaseItem from "./DatabaseItem"
import { useAppSelector } from "@/store/hooks"
import { selectDatabaseVisibility } from "@/store/database"

const DatabaseStructure = ({ database }: { database: string }) => {
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  return (
    databaseVisibility[database]?.isVisible && (
      <div key={`${database}-structure`} className="ml-8 flex flex-1 flex-col">
        <DatabaseItem database={database} itemType="tables" />
        <DatabaseItem database={database} itemType="actions" />
      </div>
    )
  )
}

export default DatabaseStructure
