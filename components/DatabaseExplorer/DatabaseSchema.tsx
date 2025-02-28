import { INamespaceInfo, ItemTypes } from "@/utils/database-types"
import { useAppSelector } from "@/store/hooks"
import { selectDatabaseVisibility } from "@/store/database"
import DatabaseItem from "./DatabaseItem"

const DatabaseSchema = ({
  database,
}: {
  database: INamespaceInfo
}) => {
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  return (
    <div key={`${database}-structure`} className="ml-11 flex flex-1 flex-col">
      {databaseVisibility[database.name]?.open && (
        <>
          <DatabaseItem database={database} itemType={ItemTypes.TABLES} />
          <DatabaseItem database={database} itemType={ItemTypes.ACTIONS} />
          <DatabaseItem database={database} itemType={ItemTypes.QUERIES} />
        </>
      )}
    </div>
  )
}

export default DatabaseSchema
