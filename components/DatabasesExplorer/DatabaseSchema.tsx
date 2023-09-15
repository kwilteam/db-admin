import { DatabaseDictionary } from "@/util/types"
import { IDisplayToggle } from "."
import { DatabaseTables } from "./DatabaseTables"
import { DatabaseActions } from "./DatabaseActions"

export const DatabaseSchema = ({
  database,
  displayToggle,
  databaseSchemas,
  toggleDisplay,
}: {
  database: string
  displayToggle: IDisplayToggle
  databaseSchemas: DatabaseDictionary
  toggleDisplay: (
    database: string,
    display: keyof IDisplayToggle[string],
  ) => void
}) => {
  return (
    databaseSchemas[database] &&
    displayToggle[database]?.schema && (
      <div key={`${database}-schema`} className="ml-7 flex flex-1 flex-col">
        <DatabaseTables
          database={database}
          displayToggle={displayToggle}
          databaseSchemas={databaseSchemas}
          toggleDisplay={toggleDisplay}
        />
        <DatabaseActions
          database={database}
          displayToggle={displayToggle}
          databaseSchemas={databaseSchemas}
          toggleDisplay={toggleDisplay}
        />
      </div>
    )
  )
}
