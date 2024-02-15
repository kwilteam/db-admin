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
  try {
    const queries: IQuery[] = []
    const transaction = await idb.transaction(StoreNames.QUERIES)
    const store = transaction.store
    let cursor = await store.openCursor()
    while (cursor) {
      if (cursor.value.dbid === dbid) {
        queries.push(cursor.value)
      }
      cursor = await cursor.continue()
    }

    await transaction.done

    return queries
  } catch (error) {
    console.error("Error fetching queries", error)
    throw error
  }
}

export const getQuery = async (
  idb: IDBPDatabase<unknown>,
  dbid: string,
  name: string,
): Promise<IQuery | undefined> => {
  try {
    const query = await idb.get(StoreNames.QUERIES, [dbid, name])
    return query
  } catch (error) {
    console.error("Error fetching query", error)
    throw error
  }
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
