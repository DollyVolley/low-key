import AccountCache from "@/logic/cache/models/MessagesCache";
import { generateSeed } from "@/logic/message-service/utils/generateSeed";
import { Account } from "@/types/account";
import { atom, useRecoilState } from "recoil";

function tryLoadFromCache(): Account {
    console.log("Loading account from cache")
    const accountCache = new AccountCache()

    const account =  accountCache.get() || {
        name: "New Account",
        seed: generateSeed(81),
        channelDescriptions: []
    }
    
    return account
}

function persistAccount(account: Account): void {
    const accountCache = new AccountCache()
    accountCache.set(account)
}

export const accountAtom = atom({
    key: 'accountState',
    default: tryLoadFromCache(),
    effects: [
        ({onSet}) => {
            onSet(account => persistAccount(account))
        }
    ]
});