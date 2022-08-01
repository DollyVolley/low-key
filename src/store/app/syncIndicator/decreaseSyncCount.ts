import { selector } from "recoil";
import { syncCountAtom } from "./syncState";

export const decreaseSyncCountSelector= selector<void>({
    key: 'decreaseSyncCountSelector', 
    get: ({get}) => {

    },
    set: ({get, set }) => { 
        const syncCount = get(syncCountAtom)
        set(syncCountAtom,  syncCount - 1)
    }
 });

