"use client"
import {
  DatabaseDictionary,
  Database,
  Table,
  ActionSchema,
} from "@/util/kwil-types"
import {
  ActionIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DatabaseIcon,
  HashtagIcon,
  TableIcon,
} from "@/util/icons"
import { Fragment, useState } from "react"
import { getDatabaseSchema } from "@/util/api"
import Link from "next/link"
import classNames from "classnames"

interface Props {
  databases: DatabaseDictionary
}

interface IDisplayToggle {
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

const DatabaseItem = ({
  database,
  displayToggle,
  getSchema,
}: {
  database: string
  displayToggle: IDisplayToggle
  getSchema: (database: string) => void
}) => {
  return (
    <li
      key={database}
      className={classNames({
        "text-md flex cursor-pointer select-none flex-row items-center gap-1 p-2 pb-1":
          true,
        "text-slate-500 hover:text-slate-900": !displayToggle[database]?.schema,
        "text-slate-900": displayToggle[database]?.schema,
      })}
      onClick={() => getSchema(database)}
    >
      <ChevronDownIcon
        className={classNames({
          "h-4 w-4": true,
          hidden: !displayToggle[database]?.schema,
        })}
      />
      <ChevronRightIcon
        className={classNames({
          "h-4 w-4": true,
          hidden: displayToggle[database]?.schema,
        })}
      />
      <DatabaseIcon
        className={classNames({
          "h-4 w-4": true,
          "text-amber-500": displayToggle[database]?.schema,
        })}
      />
      {database}
    </li>
  )
}

const DatabaseSchema = ({
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
        <DatabaseDetails
          database={database}
          displayToggle={displayToggle}
          databaseSchemas={databaseSchemas}
          toggleDisplay={toggleDisplay}
          type="tables"
        />
        <DatabaseDetails
          database={database}
          displayToggle={displayToggle}
          databaseSchemas={databaseSchemas}
          toggleDisplay={toggleDisplay}
          type="actions"
        />
      </div>
    )
  )
}

// DatabaseDetails Component
const DatabaseDetails = ({
  database,
  displayToggle,
  databaseSchemas,
  toggleDisplay,
  type,
}: {
  database: string
  displayToggle: IDisplayToggle
  databaseSchemas: DatabaseDictionary
  toggleDisplay: (
    database: string,
    display: keyof IDisplayToggle[string],
  ) => void
  type: "tables" | "actions"
}) => {
  return (
    <>
      <div
        className={classNames({
          "flex cursor-pointer select-none flex-row items-center gap-1 text-sm":
            true,
          "text-slate-500 hover:text-slate-900":
            !displayToggle[database]?.[type],
          "text-slate-900": displayToggle[database]?.[type],
        })}
        onClick={() => toggleDisplay(database, type)}
      >
        <ChevronDownIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: !displayToggle[database]?.[type],
          })}
        />
        <ChevronRightIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: displayToggle[database]?.[type],
          })}
        />
        {type === "tables" ? <TableIcon /> : <ActionIcon />}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <div className="mb-1">
        {displayToggle[database]?.[type] &&
          databaseSchemas[database]?.[type]?.map(
            (item: Table<string> | ActionSchema, index: number) => (
              <DatabaseLink
                key={index}
                database={database}
                item={item}
                type={type}
              />
            ),
          )}
      </div>
    </>
  )
}

// DatabaseLink Component
const DatabaseLink = ({
  database,
  item,
  type,
}: {
  database: string
  item: Table<string> | ActionSchema
  type: "tables" | "actions"
}) => {
  return (
    <div key={`${database}-${item.name}`} className="ml-5 text-sm">
      <Link
        href={`/databases/${database}/${type}/${item.name}`}
        className={classNames({
          "flex select-none flex-row items-center gap-1 hover:text-slate-900":
            true,
          "text-slate-500 hover:text-slate-900": true,
        })}
      >
        <HashtagIcon className="h-3 w-3" />
        {item.name}
      </Link>
    </div>
  )
}
