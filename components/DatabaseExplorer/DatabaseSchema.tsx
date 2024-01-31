import { IDatasetInfoWithoutOwner } from "@/utils/database-types"
import { useAppSelector } from "@/store/hooks"
import { selectDatabaseVisibility } from "@/store/database"
import DatabaseItem from "./DatabaseItem"
import Loading from "../Loading"

const DatabaseSchema = ({
  database,
}: {
  database: IDatasetInfoWithoutOwner
}) => {
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  return (
    <div key={`${database}-structure`} className="ml-8 flex flex-1 flex-col">
      {databaseVisibility[database.name]?.loading && (
        <Loading className="mb-1 ml-6" />
      )}
      {databaseVisibility[database.name]?.isVisible && (
        <>
          <DatabaseItem database={database} itemType="tables" />
          <DatabaseItem database={database} itemType="actions" />
        </>
      )}
    </div>
  )
}

export default DatabaseSchema
