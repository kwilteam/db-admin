import { IDBPDatabase } from "idb";
import { StoreNames } from "./init";

interface IPinnedDbs {
    dbid: string;
}

export const getPinned = async (
    idb: IDBPDatabase<unknown>,
): Promise<IPinnedDbs[] | undefined> => {
    try {
        const pinned = await idb.getAll(StoreNames.PINNED);
        return pinned;
    } catch (error) {
        console.error("Error fetching pinned", error);
        throw error;
    }
}

export const setPinned = async (
    idb: IDBPDatabase<unknown>,
    dbid: string
): Promise<void> => {
    try {
        await idb.put(StoreNames.PINNED, { dbid });
    } catch (error) {
        console.error("Error while setting pinned", error);
        throw error;
    }
}

export const deletePinned = async (
    idb: IDBPDatabase<unknown>,
    dbid: string
): Promise<void> => {
    try {
        await idb.delete(StoreNames.PINNED, dbid);
    } catch (error) {
        throw error;
    }
}