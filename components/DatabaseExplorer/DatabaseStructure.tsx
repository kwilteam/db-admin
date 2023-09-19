import DatabaseItem from "./DatabaseItem"
import { useAppSelector } from "@/store/hooks"
import { selectDatabaseVisibility } from "@/store/database"
import { Dispatch, SetStateAction } from "react"

const DatabaseStructure = ({
  database,
  setIsMenuOpen = () => {},
}: {
  database: string
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  const databaseVisibility = useAppSelector(selectDatabaseVisibility)

  return (
    databaseVisibility[database]?.isVisible && (
      <div key={`${database}-structure`} className="ml-7 flex flex-1 flex-col">
        <DatabaseItem
          database={database}
          itemType="tables"
          setIsMenuOpen={setIsMenuOpen}
        />
        <DatabaseItem
          database={database}
          itemType="actions"
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    )
  )
}

export default DatabaseStructure
