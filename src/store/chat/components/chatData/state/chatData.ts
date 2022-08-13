import { loadAndPersistCacheEffect } from "@/store/utils";
import { ChatData } from "@/types/chat";
import { atomFamily } from "recoil";

export const chatDataAtomFamily = atomFamily<ChatData | null, string>({
    key: 'chatDataAtomFamily',
    default: null,
    effects_UNSTABLE: [
        loadAndPersistCacheEffect
      ]
});