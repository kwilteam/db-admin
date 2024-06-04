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

export const setupPinned = async (idb: IDBPDatabase<unknown>) => {
     // Milady Example
     await setPinned(idb, 'x1ff3f1975a6778a2ee2a43134eadc80cdee42a978eabd40adc1824b8');
    // idOS Example
    await setPinned(idb, 'x4daa8a237aa428dc200d86976da1819c95d0a2f236f24f91889bfec3');
    // Truf Example
    await setPinned(idb, 'x7991f9b13a29bcab4bcea7cceec194e62e0badfee105ff989e3a69cb');
}