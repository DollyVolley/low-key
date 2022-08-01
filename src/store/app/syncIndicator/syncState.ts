import { atom } from "recoil";

export const syncCountAtom = atom<number>({
    key: 'syncCountAtom',
    default: 0,
});