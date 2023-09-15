import { Types as KwilTypes } from "kwil"

export interface DatabaseDictionary {
  [key: string]: KwilTypes.Database<string> | null
}
