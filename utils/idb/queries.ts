import { IDBPDatabase } from "idb"
import { StoreNames } from "./init"

export interface IQuery {
  dbid: string
  name: string
  sql: string
}

export const getQueries = async (
  idb: IDBPDatabase<unknown>,
  dbid: string,
): Promise<IQuery[]> => {
  const queries: IQuery[] = []
  let cursor = await idb.transaction(StoreNames.QUERIES).store.openCursor()
  while (cursor) {
    if (cursor.value.dbid === dbid) {
      queries.push(cursor.value)
    }
    await cursor.continue()
  }
  return queries
}

export const getQuery = async (
  idb: IDBPDatabase<unknown>,
  dbid: string,
  name: string,
): Promise<IQuery | undefined> => {
  return await idb.get(StoreNames.QUERIES, [dbid, name])
}

export const setQuery = async (
  idb: IDBPDatabase<unknown>,
  dbid: string,
  name: string,
  sql: string,
): Promise<void> => {
  try {
    await idb.put(StoreNames.QUERIES, {
      dbid,
      name,
      sql,
    })
  } catch (error) {
    console.error("Error while setting query", error)
    throw error
  }
}

export const deleteQuery = async (
  idb: IDBPDatabase<unknown>,
  dbid: string,
  name: string,
): Promise<void> => {
  try {
    await idb.delete(StoreNames.QUERIES, [dbid, name])
  } catch (error) {
    throw error
  }
}
