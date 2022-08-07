import { atom } from "recoil";

export const showDrawerAtom = atom<boolean>({
    key: 'showDrawerAtom',
    default: true,
});