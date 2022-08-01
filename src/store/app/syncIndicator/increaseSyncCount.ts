import { selector } from "recoil";
import { syncCountAtom } from "./syncState";

export const increaseSyncCountSelector= selector<void>({
    key: 'increaseSyncCountSelector', 
    get: ({get}) => {

    },
    set: ({get, set }) => { 
        const syncCount = get(syncCountAtom)
        set(syncCountAtom,  syncCount + 1)
    }
 });



