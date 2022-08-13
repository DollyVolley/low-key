import { loadAndPersistCacheEffect } from "@/store/utils";
import { atom } from "recoil";


export const currentChatIDAtom = atom({
    key: 'currentChatIDAtom',
    default: '',
    effects_UNSTABLE: [
    ]
  });