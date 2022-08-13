import { generateSeed } from "@/logic/streams-service/utils/generateSeed";
import { loadAndPersistCacheEffect } from "@/store/utils";
import { Account } from "@/types/account";
import { atom, useRecoilState } from "recoil";


export const accountAtom = atom<Account>({
    key: 'accountState',
    default: {
        name: "New Account",
        seed: generateSeed(81),
        chatDescriptions: []
    },
    effects_UNSTABLE: [
        loadAndPersistCacheEffect
      ]
});