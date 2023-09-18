import { Types as KwilTypes } from "kwil"

// Types from the Kwil library
export type { KwilTypes }

// Dictionary of database names to their schema
export interface IDatabaseSchemaDict {
  [key: string]: KwilTypes.Database<string> | null
}

// Whether a database is visible, and whether its tables and actions are visible
interface IDatabaseVisibility {
  isVisible: boolean
  tables: boolean
  actions: boolean
}

// Dictionary of database names to their visibility
export interface IDatabaseVisibilityDict {
  [key: string]: IDatabaseVisibility
}
