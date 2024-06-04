import { deletePinnedFromStore, savePinnedToStore } from "@/store/database";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function useDatabasePins() {
    const dispatch = useAppDispatch();
    const pinned = (useAppSelector((state) => state.database.pinnedDatabases));

    const togglePin = (dbid: string, e:
        React.MouseEvent<SVGElement, MouseEvent>
    ) => {
        e.stopPropagation();
        e.preventDefault();

        if(!pinned?.includes(dbid)) {
            dispatch(savePinnedToStore(dbid));
            return;
        }

        if (pinned?.includes(dbid)) {
            dispatch(deletePinnedFromStore(dbid));
        }
    }

    return { togglePin, pinned }
}