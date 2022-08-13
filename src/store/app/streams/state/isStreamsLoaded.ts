import { atom } from "recoil";

export const isStreamsLoadedAtom = atom<boolean>({
    key: 'isStreamsLoadedAtom',
    default: false,
});