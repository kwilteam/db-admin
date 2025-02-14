import { deletePinnedFromStore, savePinnedToStore } from "@/store/database";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function useDatabasePins() {
    const dispatch = useAppDispatch();
    const pinned = (useAppSelector((state) => state.database.pinnedDatabases));

    const togglePin = (name: string, e:
        React.MouseEvent<SVGElement, MouseEvent>
    ) => {
        e.stopPropagation();
        e.preventDefault();

        if(!pinned?.includes(name)) {
            dispatch(savePinnedToStore(name));
            return;
        }

        if (pinned?.includes(name)) {
            dispatch(deletePinnedFromStore(name));
        }
    }

    return { togglePin, pinned }
}