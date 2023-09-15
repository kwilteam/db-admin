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

const DatabaseTables = ({
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
    <>
      <div
        className={classNames({
          "flex cursor-pointer select-none flex-row items-center gap-1 text-sm":
            true,
          "text-slate-500 hover:text-slate-900":
            !displayToggle[database]?.tables,
          "text-slate-900": displayToggle[database]?.tables,
        })}
        onClick={() => toggleDisplay(database, "tables")}
      >
        <ChevronDownIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: !displayToggle[database]?.tables,
          })}
        />
        <ChevronRightIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: displayToggle[database]?.tables,
          })}
        />
        <TableIcon
          className={classNames({
            "h-4 w-4": true,
            "text-kwil-light": displayToggle[database]?.tables,
          })}
        />
        Tables
      </div>
      <div className="mb-1">
        {displayToggle[database]?.tables &&
          databaseSchemas[database]?.tables?.map(
            (table: Table<string>, index: number) => (
              <DatabaseTableLink
                key={index}
                database={database}
                table={table}
              />
            ),
          )}
      </div>
    </>
  )
}

const DatabaseTableLink = ({
  database,
  table,
}: {
  database: string
  table: Table<string>
}) => {
  return (
    <div key={`${database}-${table.name}`} className="ml-5 text-sm">
      <Link
        href={`/databases/${database}/table/${table.name}`}
        className={classNames({
          "flex select-none flex-row items-center gap-1 hover:text-slate-900":
            true,
          "text-slate-500 hover:text-slate-900": true,
        })}
      >
        <HashtagIcon className="h-3 w-3" />
        {table.name}
      </Link>
    </div>
  )
}

const DatabaseActions = ({
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
    <>
      <div
        className={classNames({
          "flex cursor-pointer select-none flex-row items-center gap-1 text-sm":
            true,
          "text-slate-500 hover:text-slate-900":
            !displayToggle[database]?.actions,
          "text-slate-900": displayToggle[database]?.actions,
        })}
        onClick={() => toggleDisplay(database, "actions")}
      >
        <ChevronDownIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: !displayToggle[database]?.actions,
          })}
        />
        <ChevronRightIcon
          className={classNames({
            "h-4 w-4": true,
            hidden: displayToggle[database]?.actions,
          })}
        />
        <ActionIcon
          className={classNames({
            "h-4 w-4": true,
            "text-kwil-light": displayToggle[database]?.actions,
          })}
        />
        Actions
      </div>
      {displayToggle[database]?.actions &&
        databaseSchemas[database]?.actions?.map(
          (action: ActionSchema, index: number) => (
            <DatabaseActionLink
              key={index}
              database={database}
              action={action}
            />
          ),
        )}
    </>
  )
}

const DatabaseActionLink = ({
  database,
  action,
}: {
  database: string
  action: ActionSchema
}) => {
  return (
    <div key={`${database}-${action.name}`} className="ml-5 text-sm">
      <Link
        href={`/databases/${database}/action/${action.name}`}
        className={classNames({
          "flex select-none flex-row items-center gap-1 hover:text-slate-900":
            true,
          "text-slate-500 hover:text-slate-900": true,
        })}
      >
        <HashtagIcon className="h-3 w-3" />
        {action.name}
      </Link>
    </div>
  )
}
