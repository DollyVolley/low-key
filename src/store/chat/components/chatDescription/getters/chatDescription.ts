import { accountAtom } from "@/store/account/state";
import { ChatDescription } from "@/types/chat";
import { selector } from "recoil";

export const chatDescriptionsSelector= selector({
    key: 'chatDescriptionsSelector', 
    get: ({get}) => {
      const account = get(accountAtom);
      return account.channelDescriptions
    },
    set: ({get, set}, updatedDescription) => { 
      const description = updatedDescription as ChatDescription[]
      const account = get(accountAtom);
      set(accountAtom, {...account, channelDescriptions: description})
    }
 });