"use client"
import { DatabaseDictionary, Database } from "@/util/kwil-types"
import { Fragment, useState } from "react"
import { getDatabaseSchema } from "@/util/api"
import { DatabaseItem } from "./DatabaseItem"
import { DatabaseSchema } from "./DatabaseSchema"

interface Props {
  databases: DatabaseDictionary
}

export interface IDisplayToggle {
  [key: string]: {
    schema: boolean
    tables: boolean
    actions: boolean
  }
}

// DatabasesExplorer Component
export default function DatabasesExplorer({ databases }: Props) {
  // We will fetch a DB schema when the user clicks a database, so we need to be able to update the state
  const [databaseSchemas, setDatabaseSchema] =
    useState<DatabaseDictionary>(databases)
  const [displayToggle, setDisplayToggle] = useState<IDisplayToggle>({})

  const getSchema = async (database: string) => {
    if (databaseSchemas[database]) {
      toggleDisplay(database, "schema")
      setDisplay(database, "tables", false)
      setDisplay(database, "actions", false)
    } else {
      const schema: Database<string> | undefined =
        await getDatabaseSchema(database)
      if (!schema) return

      setDatabaseSchema((prevState: DatabaseDictionary) => ({
        ...prevState,
        [database]: { ...prevState[database], ...schema },
      }))

      toggleDisplay(database, "schema")
    }
  }

  const toggleDisplay = (
    database: string,
    display: keyof IDisplayToggle[string],
  ) => {
    setDisplayToggle((prevState: IDisplayToggle) => ({
      ...prevState,
      [database]: {
        ...prevState[database],
        [display]: !prevState[database]?.[display],
      },
    }))
  }

  const setDisplay = (
    database: string,
    display: keyof IDisplayToggle[string],
    displayValue: boolean,
  ) => {
    setDisplayToggle((prevState: IDisplayToggle) => ({
      ...prevState,
      [database]: {
        ...prevState[database],
        [display]: displayValue,
      },
    }))
  }

  return (
    <div className="max-h-screen min-h-screen w-full overflow-scroll bg-slate-50/30 ">
      <ul className="flex flex-col">
        {Object.keys(databaseSchemas).map((database, index) => (
          <Fragment key={index}>
            <DatabaseItem
              database={database}
              displayToggle={displayToggle}
              getSchema={getSchema}
            />
            <DatabaseSchema
              database={database}
              displayToggle={displayToggle}
              databaseSchemas={databaseSchemas}
              toggleDisplay={toggleDisplay}
            />
          </Fragment>
        ))}
      </ul>
    </div>
  )
}
