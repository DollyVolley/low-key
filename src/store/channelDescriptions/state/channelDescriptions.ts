import { accountAtom } from "@/store/account/state";
import { ChannelDescription } from "@/types/channel";
import { selector } from "recoil";

export const channelDescriptionsSelector= selector({
    key: 'channelDescriptionsSelector', 
    get: ({get}) => {
      const account = get(accountAtom);
      return account.channelDescriptions
    },
    set: ({get, set}, updatedDescription) => { 
      const description = updatedDescription as ChannelDescription[]
      const account = get(accountAtom);
      set(accountAtom, {...account, channelDescriptions: description})
    }
 });