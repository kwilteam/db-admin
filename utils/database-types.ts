import { Types as KwilTypes } from "kwil"

// Having to include this here as the definition for body seems incorrect.
// body returns a Nillable<string> for some reason, but it should be Object[] or Record<string, string>
export interface TxReceipt {
  get txHash(): string
  get fee(): string
  get body(): Object[] | undefined
}

// Types from the Kwil library
export type { KwilTypes }

// Dictionary of database names to their object
export interface IDatabaseStructureDict {
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
